import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./create-pet";
import { randomUUID } from "node:crypto";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { PetsRepository } from "../repositories/pets-repository";
import { OrgsRepository } from "../repositories/orgs-repository";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";

let sut: CreatePetUseCase;
let petsRepository: PetsRepository;
let orgsRepository: OrgsRepository;

describe("Create pet use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);

    sut = new CreatePetUseCase(petsRepository, orgsRepository);
  });

  it("Should be able create a new Org", async () => {
    const org = await orgsRepository.create({
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

    const { pet } = await sut.execute({
      name: "Spike",
      about:
        "Encontrado na estrada 470, parece ter uma cruza com Border Collie.",
      age: "Filhote",
      size: "Médio",
      energy_level: "Baixa",
      independence_level: "Baixa",
      environment: "Ambiente amplo",
      org_id: org.id,
    });

    expect(pet).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it("Should not be able create a new pet to org non-existent", async () => {
    await expect(() =>
      sut.execute({
        name: "Lar do MauMau",
        about:
          "Encontrado na estrada 470, parece ter uma cruza com Border Collie.",
        age: "Filhote",
        size: "Médio",
        energy_level: "Baixa",
        independence_level: "Baixa",
        environment: "Ambiente amplo",
        org_id: randomUUID(),
      })
    ).rejects.toBeInstanceOf(ResourseNotFoundError);
  });
});
