import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./create-org";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { compare, hash } from "bcryptjs";

describe("Create org use case", () => {
  let sut: CreateOrgUseCase;

  beforeEach(() => {
    const repository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(repository);
  });

  it("Should be able create a new Org", async () => {
    const { org } = await sut.execute({
      name: "Lar do MauMau",
      author_name: "Mauricio Duarte",
      password: "123456",
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

    expect(org).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it("Should hash password when create new Org", async () => {
    const password = "123456";

    const { org } = await sut.execute({
      name: "Lar do MauMau",
      author_name: "Mauricio Duarte",
      password,
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

    const isMatch = await compare(password, org.password);

    expect(isMatch).toBe(true);
  });
});
