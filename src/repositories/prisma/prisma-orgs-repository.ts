import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "../../lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  async register(data: Prisma.OrgCreateInput) {
    const newOrg = await prisma.org.create({
      data,
    });

    return newOrg;
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    });

    return org;
  }
}
