import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  city: string = "Blumenau",
  email: string = "prussdev@gmail.com"
) {
  await prisma.org.create({
    data: {
      name: "Org",
      author_name: "Mauricio Duarte",
      cep: "89056-540",
      city,
      email,
      latitude: 1,
      longitude: 1,
      neighborhood: "Fortaleza",
      password: await hash("123456", 6),
      state: "SC",
      street: "Edmundo Goldacker",
      whatsapp: "47988638307",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email,
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
