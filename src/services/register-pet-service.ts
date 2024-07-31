import { Pet } from "@prisma/client";
import { OrgsRepository } from "../repositories/orgs-repository";
import { PetsRepository } from "../repositories/pets-repository";
import { OrgNotFoundError } from "./errors/org-not-found-error";
import { randomUUID } from "crypto";

interface RegisterPetServiceParams {
  id?: string;
  name: string;
  about: string;
  age: "PUPPY" | "ADULT" | "SENIOR";
  energy: "LOW" | "HIGH";
  independence: "LOW" | "HIGH";
  size: "SMALL" | "MEDIUM" | "LARGE";
  space: "CLOSED" | "WIDE";
  orgId: string;
}

interface RegisterPetServiceResponse {
  pet: Pet;
}

export class RegisterPetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    id,
    name,
    about,
    age,
    energy,
    independence,
    orgId,
    size,
    space,
  }: RegisterPetServiceParams): Promise<RegisterPetServiceResponse> {
    const doesOrgExist = await this.orgsRepository.findById(orgId);

    if (!doesOrgExist) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petsRepository.create({
      id: id ?? randomUUID(),
      name,
      about,
      age,
      energy,
      independence,
      orgId,
      size,
      space,
    });

    return { pet };
  }
}
