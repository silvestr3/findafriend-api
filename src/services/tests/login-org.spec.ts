import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { RegisterOrgService } from "../register-org-service";
import { LoginOrgService } from "../login-org-service";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: LoginOrgService;

describe("Register org tests", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new LoginOrgService(orgsRepository);
  });

  it("Should be able to authenticate as an Org", async () => {
    await orgsRepository.register({
      name: "New org",
      address: "That street",
      cep: "123534",
      city: "São Paulo",
      email: "test@email.org",
      password_hash: await hash("123456", 6),
      representant: "Zezao",
      whatsapp: "918273981",
    });

    const { org } = await sut.execute({
      email: "test@email.org",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with incorrect password", async () => {
    await orgsRepository.register({
      name: "New org",
      address: "That street",
      cep: "123534",
      city: "São Paulo",
      email: "test@email.org",
      password_hash: await hash("123456", 6),
      representant: "Zezao",
      whatsapp: "918273981",
    });

    await expect(() =>
      sut.execute({
        email: "test@email.org",
        password: "incorrect",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate with inexisting email", async () => {
    await expect(() =>
      sut.execute({
        email: "test@email.org",
        password: "incorrect",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
