import { Prisma, Pet } from "@prisma/client";
import { fetchPetsInput, PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

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

  async fetch(params: fetchPetsInput): Promise<Pet[]> {
    const { orgIds, about, age, energy, independence, size, space } = params;
    let pets = await this.pets
      .filter((item) => orgIds.includes(item.orgId))
      .filter((item) => (about ? item.about.includes(about) : item))
      .filter((item) => (age ? item.age === age : item))
      .filter((item) => (energy ? item.energy === energy : item))
      .filter((item) =>
        independence ? item.independence === independence : item
      )
      .filter((item) => (size ? item.size === size : item))
      .filter((item) => (space ? item.space === space : item));

    return pets;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await this.pets.find((item) => item.id === id);

    return pet ?? null;
  }
}
