import { Prisma, Pet } from "@prisma/client";
import { fetchPetsInput, PetsRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async fetch(params: fetchPetsInput): Promise<Pet[]> {
    const { orgIds, about, age, energy, independence, size, space } = params;

    const pets = await prisma.pet.findMany({
      where: {
        orgId: {
          in: orgIds,
        },
        about,
        age,
        energy,
        independence,
        size,
        space,
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
