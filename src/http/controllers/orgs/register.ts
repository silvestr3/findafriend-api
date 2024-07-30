import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeRegisterOrgService } from "../../../factories/make-org-service";
import { OrgAlreadyExistsError } from "../../../services/errors/org-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    representant: z.string(),
    email: z.string(),
    cep: z.string(),
    address: z.string(),
    city: z.string(),
    whatsapp: z.string(),
    password: z.string(),
  });

  const { name, representant, email, cep, address, city, whatsapp, password } =
    registerOrgBodySchema.parse(request.body);

  try {
    const registerOrgService = MakeRegisterOrgService();
    await registerOrgService.execute({
      name,
      representant,
      email,
      cep,
      address,
      city,
      whatsapp,
      password,
    });
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err });
    }
    throw err;
  }

  return reply.status(201).send();
}
