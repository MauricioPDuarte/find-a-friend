import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { getPetUseCaseFactory } from "../../../use-cases/factories/get-pet-use-case-factory";

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = getPetParamsSchema.parse(request.params);

  const getPetUseCase = getPetUseCaseFactory();

  const { pet } = await getPetUseCase.execute({
    id: petId,
  });

  return reply.status(200).send({ pet });
}
