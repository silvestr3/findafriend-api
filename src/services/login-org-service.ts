import { Org } from "@prisma/client";
import { OrgsRepository } from "../repositories/orgs-repository";
import { compare, hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface LoginOrgServiceParams {
  email: string;
  password: string;
}

interface LoginOrgServiceResponse {
  org: Org;
}

export class LoginOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: LoginOrgServiceParams): Promise<LoginOrgServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doPasswordsMatch = await compare(password, org.password_hash);

    if (!doPasswordsMatch) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
