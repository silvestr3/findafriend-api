import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { MakeFetchPetsByCityService } from "../../../factories/make-fetch-pets-by-city-service";

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
  });

  try {
    const { city } = fetchPetsQuerySchema.parse(request.query);
    const fetchPetsService = MakeFetchPetsByCityService();
    const { pets } = await fetchPetsService.execute({ city });

    return { city, pets };
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: "City filter not provided" });
    }

    throw error;
  }
}
