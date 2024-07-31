import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";
import { OrgsRepository } from "../repositories/orgs-repository";

interface FetchPetsServiceParams {
  city: string;
  about?: string;
  age?: "PUPPY" | "ADULT" | "SENIOR";
  energy?: "LOW" | "HIGH";
  independence?: "LOW" | "HIGH";
  size?: "SMALL" | "MEDIUM" | "LARGE";
  space?: "CLOSED" | "WIDE";
}

interface FetchPetsServiceResponse {
  pets: Pet[];
}

export class FetchPetsService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    city,
    about,
    age,
    energy,
    independence,
    size,
    space,
  }: FetchPetsServiceParams): Promise<FetchPetsServiceResponse> {
    const orgIds = (await this.orgsRepository.fetchByCity(city)).map(
      (org) => org.id
    );

    const pets = await this.petsRepository.fetch({
      orgIds,
      about,
      age,
      energy,
      independence,
      size,
      space,
    });

    return { pets };
  }
}
