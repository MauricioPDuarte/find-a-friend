import { Pet, Prisma } from "@prisma/client";

export interface FetchAllByCityParams {
  city: string;
  age?: string;
  energy_level?: string;
  size?: string;
  independence_level?: string;
  page: number;
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  create(data: Prisma.PetCreateManyInput): Promise<Pet>;
  fetchAllAvailablePetsByCity(params: FetchAllByCityParams): Promise<Pet[]>;
}
