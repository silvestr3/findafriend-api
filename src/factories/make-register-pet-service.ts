import { PrismaOrgsRepository } from "../repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "../repositories/prisma/prisma-pets-repository";
import { RegisterPetService } from "../services/register-pet-service";

export function MakeRegisterPetService() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();

  const service = new RegisterPetService(petsRepository, orgsRepository);

  return service;
}
