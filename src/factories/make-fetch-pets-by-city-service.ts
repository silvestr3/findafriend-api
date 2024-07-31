import { PrismaOrgsRepository } from "../repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "../repositories/prisma/prisma-pets-repository";
import { FetchPetsByCityService } from "../services/fetch-pets-by-city-service";

export function MakeFetchPetsByCityService() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();

  const service = new FetchPetsByCityService(petsRepository, orgsRepository);

  return service;
}
