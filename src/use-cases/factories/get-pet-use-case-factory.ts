import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository";
import { CreateOrgUseCase } from "../create-org";
import { GetPetUseCase } from "../get-pet";

export function getPetUseCaseFactory() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const getPetUseCase = new GetPetUseCase(prismaPetsRepository);

  return getPetUseCase;
}
