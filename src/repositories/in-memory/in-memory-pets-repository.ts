import { Prisma, Pet } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { FetchAllByCityParams, PetsRepository } from "../pets-repository";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private orgsRepository: OrgsRepository) {}

  private items: Pet[] = [];

  async fetchAllAvailablePetsByCity(params: FetchAllByCityParams) {
    const result: Pet[] = [];

    for (const item of this.items) {
      const org = await this.orgsRepository.findById(item.org_id);

      if (
        org?.city.toLowerCase() === params.city.toLowerCase() &&
        item.adopted_at == null
      ) {
        if (params.size && params.size !== item.size) {
          continue;
        }

        if (params.age && params.age !== item.age) {
          continue;
        }

        if (params.energy_level && params.energy_level !== item.energy_level) {
          continue;
        }

        if (
          params.independence_level &&
          params.independence_level !== item.independence_level
        ) {
          continue;
        }

        result.push(item);
      }
    }

    return result.slice((params.page - 1) * 20, params.page * 20);
  }

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async create(data: Prisma.PetCreateManyInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      independence_level: data.independence_level,
      org_id: data.org_id,
      created_at: new Date(),
      adopted_by: null,
      contact_answerable: null,
      adopted_at: null,
    };

    this.items.push(pet);

    return pet;
  }
}
