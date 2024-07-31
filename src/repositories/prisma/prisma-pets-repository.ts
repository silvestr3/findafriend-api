import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async fetchByCity(city: string): Promise<Pet[]> {
    const orgsInCity = await prisma.org.findMany({
      select: {
        id: true,
      },
      where: {
        city,
      },
    });

    const pets = await prisma.pet.findMany({
      where: {
        orgId: {
          in: orgsInCity.map((item) => item.id),
        },
      },
    });

    return pets;
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
