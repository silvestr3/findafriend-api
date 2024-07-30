import { PrismaOrgsRepository } from "../repositories/prisma/prisma-orgs-repository";
import { LoginOrgService } from "../services/login-org-service";

export function MakeLoginOrgService() {
  const repository = new PrismaOrgsRepository();
  const service = new LoginOrgService(repository);

  return service;
}
