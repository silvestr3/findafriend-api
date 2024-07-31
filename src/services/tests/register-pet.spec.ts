import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { RegisterPetService } from "../register-pet-service";
import { OrgNotFoundError } from "../errors/org-not-found-error";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: RegisterPetService;

describe("Register pet tests", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();

    sut = new RegisterPetService(petsRepository, orgsRepository);
  });

  it("Should be able to register a new pet", async () => {
    await orgsRepository.orgs.push({
      id: "org-01",
      address: "test",
      cep: "test",
      city: "city",
      email: "email@email.com",
      name: "orgzinha",
      password_hash: "test",
      representant: "test",
      whatsapp: "9287398172",
    });

    const { pet } = await sut.execute({
      name: "Fred",
      about: "Doidinho caramelo",
      age: "ADULT",
      energy: "HIGH",
      independence: "HIGH",
      orgId: "org-01",
      size: "LARGE",
      space: "WIDE",
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("Should not be able to register a pet to unexisting org", async () => {
    await expect(() =>
      sut.execute({
        name: "Fred",
        about: "Doidinho caramelo",
        age: "ADULT",
        energy: "HIGH",
        independence: "HIGH",
        orgId: "org-02",
        size: "LARGE",
        space: "WIDE",
      })
    ).rejects.toBeInstanceOf(OrgNotFoundError);
  });
});
