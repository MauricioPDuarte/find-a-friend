import { beforeEach, describe, expect, it } from "vitest";
import { OrgsRepository } from "../repositories/orgs-repository";
import { PetsRepository } from "../repositories/pets-repository";
import { FetchAllAvailablePetsByCityUseCase } from "./fetch-all-available-pets-by-city";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import exp from "constants";

let orgsRepository: OrgsRepository;
let petsRepository: PetsRepository;
let sut: FetchAllAvailablePetsByCityUseCase;

describe("Fetch all available pets by city use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new FetchAllAvailablePetsByCityUseCase(petsRepository);
  });

  it("should be able list all pets by one specific city", async () => {
    const orgBlumenau = await orgsRepository.create({
      name: "Lar do MauMau",
      author_name: "Mauricio Duarte",
      password: "123456",
      email: "p:russdev@gmail.com",
      whatsapp: "47988638307",
      cep: "89056-540",
      state: "SC",
      city: "Blumenau",
      neighborhood: "Fortaleza",
      street: "Rua Edmundo Goldacker",
      latitude: -26.8632162,
      longitude: -49.0799275,
    });

    const orgCuritiba = await orgsRepository.create({
      name: "Lar do Edivaldo",
      author_name: "Edivaldo Costa",
      password: "123456",
      email: "edivaldo@gmail.com",
      whatsapp: "47988628452",
      cep: "80410-210",
      state: "PR",
      city: "Curitiba",
      neighborhood: "Centro",
      street: "Rua Alameda Cabral",
      latitude: -25.4312071,
      longitude: -49.2772849,
    });

    await petsRepository.create({
      name: "Spike",
      about:
        "Encontrado na estrada 470, parece ter uma cruza com Border Collie.",
      age: "Filhote",
      size: "Médio",
      energy_level: "Baixa",
      independence_level: "Baixa",
      environment: "Ambiente amplo",
      org_id: orgBlumenau.id,
    });

    await petsRepository.create({
      name: "Golias",
      about: "Encontrado no mercadinho da Juliana no centro da cidade.",
      age: "Filhote",
      size: "Médio",
      energy_level: "Baixa",
      independence_level: "Baixa",
      environment: "Ambiente amplo",
      org_id: orgBlumenau.id,
    });

    await petsRepository.create({
      name: "Junior",
      about: "Encontrado no beco da rua 15 no bairro Passo Manso.",
      age: "Adulto",
      size: "Pequenino",
      energy_level: "Baixa",
      independence_level: "Baixa",
      environment: "Ambiente amplo",
      org_id: orgCuritiba.id,
    });

    const { pets } = await sut.execute({ city: "Blumenau", page: 1 });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Spike" }),
        expect.objectContaining({ name: "Golias" }),
      ])
    );
  });

  it("should be able list all pets by specific size", async () => {
    const orgBlumenau = await orgsRepository.create({
      name: "Lar do MauMau",
      author_name: "Mauricio Duarte",
      password: "123456",
      email: "p:russdev@gmail.com",
      whatsapp: "47988638307",
      cep: "89056-540",
      state: "SC",
      city: "Blumenau",
      neighborhood: "Fortaleza",
      street: "Rua Edmundo Goldacker",
      latitude: -26.8632162,
      longitude: -49.0799275,
    });

    await petsRepository.create({
      name: "Spike",
      about:
        "Encontrado na estrada 470, parece ter uma cruza com Border Collie.",
      age: "Filhote",
      size: "Pequeno",
      energy_level: "Baixa",
      independence_level: "Baixa",
      environment: "Ambiente amplo",
      org_id: orgBlumenau.id,
    });

    await petsRepository.create({
      name: "Golias",
      about: "Encontrado no mercadinho da Juliana no centro da cidade.",
      age: "Filhote",
      size: "Médio",
      energy_level: "Baixa",
      independence_level: "Baixa",
      environment: "Ambiente amplo",
      org_id: orgBlumenau.id,
    });

    await petsRepository.create({
      name: "Golias",
      about: "Encontrado no mercadinho da Juliana no centro da cidade.",
      age: "Filhote",
      size: "Grande",
      energy_level: "Baixa",
      independence_level: "Baixa",
      environment: "Ambiente amplo",
      org_id: orgBlumenau.id,
    });

    await petsRepository.create({
      name: "Golias 2",
      about: "Encontrado no mercadinho da Juliana no centro da cidade.",
      age: "Filhote",
      size: "Grande",
      energy_level: "Baixa",
      independence_level: "Baixa",
      environment: "Ambiente amplo",
      org_id: orgBlumenau.id,
    });

    const { pets: petsSmall } = await sut.execute({
      city: "Blumenau",
      size: "Pequeno",
      page: 1,
    });

    expect(petsSmall).toHaveLength(1);

    const { pets: petsMedium } = await sut.execute({
      city: "Blumenau",
      size: "Médio",
      page: 1,
    });

    expect(petsMedium).toHaveLength(1);

    const { pets: petsLarge } = await sut.execute({
      city: "Blumenau",
      size: "Grande",
      page: 1,
    });

    expect(petsLarge).toHaveLength(2);

    const { pets: allPets } = await sut.execute({
      city: "Blumenau",
      page: 1,
    });

    expect(allPets).toHaveLength(4);
  });

  it("should be able to fetch paginated pets", async () => {
    const orgBlumenau = await orgsRepository.create({
      name: "Lar do MauMau",
      author_name: "Mauricio Duarte",
      password: "123456",
      email: "p:russdev@gmail.com",
      whatsapp: "47988638307",
      cep: "89056-540",
      state: "SC",
      city: "Blumenau",
      neighborhood: "Fortaleza",
      street: "Rua Edmundo Goldacker",
      latitude: -26.8632162,
      longitude: -49.0799275,
    });

    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Spike-${i}`,
        about:
          "Encontrado na estrada 470, parece ter uma cruza com Border Collie.",
        age: "Filhote",
        size: "Médio",
        energy_level: "Baixa",
        independence_level: "Baixa",
        environment: "Ambiente amplo",
        org_id: orgBlumenau.id,
      });
    }

    const { pets } = await sut.execute({ city: "Blumenau", page: 2 });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Spike-21" }),
      expect.objectContaining({ name: "Spike-22" }),
    ]);
  });
});
