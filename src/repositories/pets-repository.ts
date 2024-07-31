import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  fetchByOrgIds(orgIds: string[]): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
}
