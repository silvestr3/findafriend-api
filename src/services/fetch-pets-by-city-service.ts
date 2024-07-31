import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";
import { OrgsRepository } from "../repositories/orgs-repository";

interface FetchPetsByCityServiceParams {
  city: string;
}

interface FetchPetsByCityServiceResponse {
  pets: Pet[];
}

export class FetchPetsByCityService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    city,
  }: FetchPetsByCityServiceParams): Promise<FetchPetsByCityServiceResponse> {
    const orgIds = (await this.orgsRepository.fetchByCity(city)).map(
      (org) => org.id
    );

    const pets = await this.petsRepository.fetchByOrgIds(orgIds);

    return { pets };
  }
}
