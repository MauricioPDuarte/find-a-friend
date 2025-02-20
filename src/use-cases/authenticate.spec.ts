import { beforeEach, describe, expect, it } from "vitest";
import { OrgsRepository } from "../repositories/orgs-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { object } from "zod";
import exp from "constants";

let orgsRepository: OrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able authenticate", async () => {
    orgsRepository.create({
      name: "Lar do MauMau",
      author_name: "Mauricio Duarte",
      password: await hash("123456", 6),
      email: "prussdev@gmail.com",
      whatsapp: "47988638307",
      cep: "89056-540",
      state: "SC",
      city: "Blumenau",
      neighborhood: "Fortaleza",
      street: "Rua Edmundo Goldacker",
      latitude: -26.8632162,
      longitude: -49.0799275,
    });

    const { org } = await sut.execute({
      email: "prussdev@gmail.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });
});
