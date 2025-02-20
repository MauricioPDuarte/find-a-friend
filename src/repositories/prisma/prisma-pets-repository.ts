import { Prisma, Org, Pet } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { FetchAllByCityParams, PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async fetchAllAvailablePetsByCity(params: FetchAllByCityParams) {
    return await prisma.pet.findMany({
      take: 20,
      skip: (params.page - 1) * 20,
      where: {
        org: { city: { contains: params.city } },
        age: { contains: params.age },
        size: { contains: params.size },
        energy_level: { contains: params.energy_level },
        independence_level: { contains: params.independence_level },
        adopted_at: null,
      },
    });
  }

  async findById(id: string) {
    return await prisma.pet.findUnique({ where: { id } });
  }

  async create(data: Prisma.PetCreateManyInput) {
    return await prisma.pet.create({ data });
  }
}
