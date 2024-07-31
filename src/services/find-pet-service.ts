import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";

interface FindPetServiceParams {
  id: string;
}

interface FindPetServiceResponse {
  pet: Pet | null;
}

export class FindPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: FindPetServiceParams): Promise<FindPetServiceResponse> {
    const pet = await this.petsRepository.findById(id);

    return { pet };
  }
}
