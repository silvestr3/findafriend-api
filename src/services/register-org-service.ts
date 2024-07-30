import { Org } from "@prisma/client";
import { OrgsRepository } from "../repositories/orgs-repository";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

interface RegisterOrgServiceParams {
  name: string;
  representant: string;
  email: string;
  cep: string;
  address: string;
  city: string;
  whatsapp: string;
  password: string;
}

interface RegisterOrgServiceResponse {
  org: Org;
}

export class RegisterOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    representant,
    email,
    cep,
    address,
    city,
    whatsapp,
    password,
  }: RegisterOrgServiceParams): Promise<RegisterOrgServiceResponse> {
    const password_hash = await hash(password, 6);

    const orgExists = await this.orgsRepository.findByEmail(email);

    if (orgExists) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.register({
      name,
      representant,
      email,
      cep,
      address,
      city,
      whatsapp,
      password_hash,
    });

    return { org };
  }
}
