import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { RegisterOrgService } from "../register-org-service";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterOrgService;

describe("Register org tests", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterOrgService(orgsRepository);
  });

  it("Should be able to register a new Org", async () => {
    const { org } = await sut.execute({
      name: "New org",
      address: "That street",
      cep: "123534",
      city: "São Paulo",
      email: "test@email.org",
      password: "123456",
      representant: "Zezao",
      whatsapp: "918273981",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("Should not be able to register with duplicate email", async () => {
    await sut.execute({
      name: "New org",
      address: "That street",
      cep: "123534",
      city: "São Paulo",
      email: "test@email.org",
      password: "123456",
      representant: "Zezao",
      whatsapp: "918273981",
    });

    await expect(() =>
      sut.execute({
        name: "New org",
        address: "That street",
        cep: "123534",
        city: "São Paulo",
        email: "test@email.org",
        password: "123456",
        representant: "Zezao",
        whatsapp: "918273981",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
