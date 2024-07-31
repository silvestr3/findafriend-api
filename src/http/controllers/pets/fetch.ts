import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { MakeFetchPetsService } from "../../../factories/make-fetch-pets-service";

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    about: z.string().optional(),
    age: z.enum(["PUPPY", "ADULT", "SENIOR"]).optional(),
    energy: z.enum(["HIGH", "LOW"]).optional(),
    independence: z.enum(["HIGH", "LOW"]).optional(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
    space: z.enum(["CLOSED", "WIDE"]).optional(),
  });

  try {
    const { city, about, age, energy, independence, size, space } =
      fetchPetsQuerySchema.parse(request.query);

    const fetchPetsService = MakeFetchPetsService();
    const { pets } = await fetchPetsService.execute({
      city,
      about,
      age,
      energy,
      independence,
      size,
      space,
    });

    return { city, pets };
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: "City filter not provided" });
    }

    throw error;
  }
}
