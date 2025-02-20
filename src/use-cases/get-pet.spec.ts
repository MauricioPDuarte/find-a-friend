import { beforeEach, describe, expect, it } from "vitest";
import { PetsRepository } from "../repositories/pets-repository";
import { GetPetUseCase } from "./get-pet";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { OrgsRepository } from "../repositories/orgs-repository";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";

let orgsRepository: OrgsRepository;
let petsRepository: PetsRepository;
let sut: GetPetUseCase;

describe("Get pet use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able get pet by id", async () => {
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

    const createdPet = await petsRepository.create({
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

    const { pet } = await sut.execute({ id: createdPet.id });

    expect(pet).toEqual(expect.objectContaining({ name: "Spike" }));
  });

  it("should not be able get pet by id non-existent", async () => {
    await expect(() =>
      sut.execute({ id: "id-non-existent" })
    ).rejects.instanceOf(ResourseNotFoundError);
  });
});
