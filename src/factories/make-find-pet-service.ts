import { PrismaPetsRepository } from "../repositories/prisma/prisma-pets-repository";
import { FindPetService } from "../services/find-pet-service";

export function MakeFindPetService() {
  const petsRepository = new PrismaPetsRepository();
  const service = new FindPetService(petsRepository);

  return service;
}
