import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { createOrgUseCaseFactory } from "../../../use-cases/factories/create-org-use-case-factory";
import { createPetUseCaseFactory } from "../../../use-cases/factories/create-pet-use-case-factory";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(["Filhote", "Adulto", "Avançado"]),
    size: z.enum(["Pequenino", "Médio", "Grande"]),
    energy_level: z.enum(["Baixo", "Médio", "Alto"]),
    independence_level: z.enum(["Baixo", "Médio", "Alto"]),
    environment: z.enum([
      "Ambiente Amplo",
      "Ambiente médio",
      "Ambiente pequeno",
    ]),
  });

  const {
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
  } = createPetBodySchema.parse(request.body);

  const createPetUseCase = createPetUseCaseFactory();

  await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    org_id: request.user.sub,
  });

  return reply.status(201).send();
}
