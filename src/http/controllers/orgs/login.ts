import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeLoginOrgService } from "../../../factories/make-login-service";
import { InvalidCredentialsError } from "../../../services/errors/invalid-credentials-error";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = loginBodySchema.parse(request.body);

  try {
    const loginService = MakeLoginOrgService();
    const { org } = await loginService.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );

    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message });
    }
  }
}
