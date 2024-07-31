import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      energy: data.energy,
      independence: data.independence,
      orgId: data.orgId,
      size: data.size,
      space: data.space,
    };

    await this.pets.push(pet);

    return pet;
  }

  async fetchByOrgIds(orgIds: string[]): Promise<Pet[]> {
    const pets = await this.pets.filter((item) => orgIds.includes(item.orgId));

    return pets;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await this.pets.find((item) => item.id === id);

    return pet ?? null;
  }
}
