import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { createOrgUseCaseFactory } from "../../../use-cases/factories/create-org-use-case-factory";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const {
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    street,
    neighborhood,
    latitude,
    longitude,
  } = createOrgBodySchema.parse(request.body);

  const createOrgUseCase = createOrgUseCaseFactory();

  await createOrgUseCase.execute({
    author_name,
    name,
    email,
    whatsapp,
    state,
    cep,
    password,
    street,
    city,
    neighborhood,
    latitude,
    longitude,
  });

  return reply.status(201).send();
}
