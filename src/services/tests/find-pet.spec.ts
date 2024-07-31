import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { FetchPetsService } from "../fetch-pets-service";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { FindPetService } from "../find-pet-service";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FindPetService;

describe("Find pet service tests", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FindPetService(petsRepository);
  });

  it("Should be able to find a pet by id", async () => {
    orgsRepository.orgs.push({
      id: "org-01",
      name: "New org",
      address: "That street",
      cep: "123534",
      city: "São Paulo",
      email: "test@email.org",
      password_hash: "123456",
      representant: "Zezao",
      whatsapp: "918273981",
    });

    petsRepository.pets.push({
      id: "pet-01",
      name: "Fred",
      about: "Doidinho caramelo",
      age: "ADULT",
      energy: "HIGH",
      independence: "HIGH",
      orgId: "org-01",
      size: "LARGE",
      space: "WIDE",
    });

    const { pet } = await sut.execute({ id: "pet-01" });

    expect(pet).toEqual(
      expect.objectContaining({
        name: "Fred",
      })
    );
  });
});
