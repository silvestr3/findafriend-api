import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeRegisterPetService } from "../../../factories/make-register-pet-service";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(["PUPPY", "ADULT", "SENIOR"]),
    energy: z.enum(["HIGH", "LOW"]),
    independence: z.enum(["HIGH", "LOW"]),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    space: z.enum(["CLOSED", "WIDE"]),
  });

  const orgId = request.user.sub;

  const { about, age, energy, independence, name, size, space } =
    registerPetBodySchema.parse(request.body);

  const registerPetService = MakeRegisterPetService();
  registerPetService.execute({
    name,
    orgId,
    about,
    age,
    energy,
    independence,
    size,
    space,
  });

  return reply.status(201).send();
}
