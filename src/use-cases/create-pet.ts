import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";
import { OrgsRepository } from "../repositories/orgs-repository";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: string;
  size: string;
  energy_level: string;
  independence_level: string;
  environment: string;
  org_id: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgRepository: OrgsRepository
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgRepository.findById(org_id);

    if (!org) {
      throw new ResourseNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      org_id,
    });

    return { pet };
  }
}
