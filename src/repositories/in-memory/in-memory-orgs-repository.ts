import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = [];

  async register(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      representant: data.representant,
      email: data.email,
      cep: data.cep,
      address: data.address,
      city: data.city,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
    };

    this.orgs.push(org);

    return org;
  }

  async findById(id: string) {
    const org = this.orgs.find((item) => item.id === id);

    return org === undefined ? null : org;
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((item) => item.email === email);

    return org === undefined ? null : org;
  }
}
