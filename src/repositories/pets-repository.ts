import { Pet, Prisma } from "@prisma/client";

export interface fetchPetsInput {
  orgIds: string[];
  about?: string;
  age?: "PUPPY" | "ADULT" | "SENIOR";
  energy?: "LOW" | "HIGH";
  independence?: "LOW" | "HIGH";
  size?: "SMALL" | "MEDIUM" | "LARGE";
  space?: "CLOSED" | "WIDE";
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  fetch(params: fetchPetsInput): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
}
