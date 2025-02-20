import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { getFetchAllAvailablePetsByCityUseCaseFactory } from "../../../use-cases/factories/fetch-all-available-pets-by-city-use-case-factory";

export async function fetchAvailableByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchPetsQueryParamsSchema = z.object({
    city: z.string(),
    age: z.enum(["Filhote", "Adulto", "Avançado"]).optional(),
    size: z.enum(["Pequenino", "Médio", "Grande"]).optional(),
    energy_level: z.enum(["Baixo", "Médio", "Alto"]).optional(),
    independence_level: z.enum(["Baixo", "Médio", "Alto"]).optional(),
    page: z.coerce.number().default(1),
  });

  const { city, age, size, energy_level, page, independence_level } =
    fetchPetsQueryParamsSchema.parse(request.query);

  const fetchAllAvailablePetsByCityUseCase =
    getFetchAllAvailablePetsByCityUseCaseFactory();

  const { pets } = await fetchAllAvailablePetsByCityUseCase.execute({
    city,
    age,
    size,
    energy_level,
    page,
    independence_level,
  });

  return reply.status(200).send({ pets });
}
