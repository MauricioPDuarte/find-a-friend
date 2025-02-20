import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository";
import { FetchAllAvailablePetsByCityUseCase } from "../fetch-all-available-pets-by-city";

export function getFetchAllAvailablePetsByCityUseCaseFactory() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const fetchAllAvailablePetsByCityUseCase =
    new FetchAllAvailablePetsByCityUseCase(prismaPetsRepository);

  return fetchAllAvailablePetsByCityUseCase;
}
