import { PrismaOrgsRepository } from "../repositories/prisma/prisma-orgs-repository";
import { RegisterOrgService } from "../services/register-org-service";

export function MakeRegisterOrgService() {
  const repository = new PrismaOrgsRepository();
  const service = new RegisterOrgService(repository);

  return service;
}
