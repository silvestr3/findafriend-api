import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async fetchByOrgIds(orgIds: string[]): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        orgId: {
          in: orgIds,
        },
      },
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }
}
