import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeFindPetService } from "../../../factories/make-find-pet-service";

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const findPetParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = findPetParamsSchema.parse(request.params);

  const findPetService = MakeFindPetService();

  const { pet } = await findPetService.execute({ id });

  if (!pet) {
    return reply.status(404).send({ message: "Pet not found" });
  }

  return { pet };
}
