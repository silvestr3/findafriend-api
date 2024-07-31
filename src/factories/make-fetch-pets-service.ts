import { PrismaOrgsRepository } from "../repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "../repositories/prisma/prisma-pets-repository";
import { FetchPetsService } from "../services/fetch-pets-service";

export function MakeFetchPetsService() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();

  const service = new FetchPetsService(petsRepository, orgsRepository);

  return service;
}
