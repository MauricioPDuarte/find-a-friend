import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";

interface FetchAllAvailablePetsByCityUseCaseRequest {
  city: string;
  age?: string;
  energy_level?: string;
  size?: string;
  independence_level?: string;
  page: number;
}

interface FetchAllAvailablePetsByCityUseCaseResponse {
  pets: Pet[];
}

export class FetchAllAvailablePetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    size,
    age,
    energy_level,
    independence_level,
    page,
  }: FetchAllAvailablePetsByCityUseCaseRequest): Promise<FetchAllAvailablePetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.fetchAllAvailablePetsByCity({
      city,
      size,
      age,
      energy_level,
      independence_level,
      page,
    });

    return { pets };
  }
}
