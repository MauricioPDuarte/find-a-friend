import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Get by id (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get pet by id", async () => {
    const org = await prisma.org.create({
      data: {
        name: "Org",
        author_name: "Mauricio Duarte",
        cep: "89056-540",
        city: "Blumenau",
        email: "prussdev@gmail.com",
        latitude: 1,
        longitude: 1,
        neighborhood: "Fortaleza",
        password: await hash("123456", 6),
        state: "SC",
        street: "Edmundo Goldacker",
        whatsapp: "47988638307",
      },
    });

    const pet = await prisma.pet.create({
      data: {
        name: "Spike",
        about: "Encontrado na BR 470",
        age: "Filhote",
        energy_level: "Baixo",
        environment: "Ambiente Amplo",
        independence_level: "Baixo",
        size: "Médio",
        org_id: org.id,
      },
    });

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .query({
        city: "Blumenau",
      })
      .send();

    expect(response.body.pet).toEqual(expect.objectContaining({ id: pet.id }));
  });
});
