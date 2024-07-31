import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { FetchPetsByCityService } from "../fetch-pets-by-city-service";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FetchPetsByCityService;

describe("Register org tests", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchPetsByCityService(petsRepository, orgsRepository);
  });

  it("Should be able to fetch pets given a city", async () => {
    orgsRepository.orgs.push(
      {
        id: "org-01",
        name: "New org",
        address: "That street",
        cep: "123534",
        city: "São Paulo",
        email: "test@email.org",
        password_hash: "123456",
        representant: "Zezao",
        whatsapp: "918273981",
      },
      {
        id: "org-02",
        name: "New org",
        address: "That street",
        cep: "123534",
        city: "Other City",
        email: "other@email.org",
        password_hash: "123456",
        representant: "Zezao",
        whatsapp: "918273981",
      }
    );

    petsRepository.pets.push(
      {
        id: "pet-01",
        name: "Fred",
        about: "Doidinho caramelo",
        age: "ADULT",
        energy: "HIGH",
        independence: "HIGH",
        orgId: "org-01",
        size: "LARGE",
        space: "WIDE",
      },
      {
        id: "pet-02",
        name: "Other",
        about: "Doidinho caramelo",
        age: "ADULT",
        energy: "HIGH",
        independence: "HIGH",
        orgId: "org-02",
        size: "LARGE",
        space: "WIDE",
      }
    );

    const { pets } = await sut.execute({ city: "Other" });

    expect(pets.length).toEqual(1);
    expect(pets).toEqual([
      expect.objectContaining({
        name: "Other",
      }),
    ]);
  });
});
