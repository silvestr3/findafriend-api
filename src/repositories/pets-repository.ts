import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  fetchByCity(city: string): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
}
