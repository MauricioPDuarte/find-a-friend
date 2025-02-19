import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { CreateOrgUseCase } from "../create-org";

export function createOrgUseCaseFactory() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const createOrgUseCase = new CreateOrgUseCase(prismaOrgsRepository);

  return createOrgUseCase;
}
