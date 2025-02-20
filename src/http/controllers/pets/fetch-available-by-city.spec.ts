import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Fetch available by city (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list available pets by city", async () => {
    const { token: tokenBlumenau } = await createAndAuthenticateOrg(
      app,
      "Blumenau",
      "blumenauorg@gmail.com"
    );
    const { token: tokenCuritiba } = await createAndAuthenticateOrg(
      app,
      "Curitiba",
      "curitibaorg@gmail.com"
    );

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${tokenBlumenau}`)
      .send({
        name: "Spike",
        about: "Encontrado na BR 470",
        age: "Filhote",
        energy_level: "Baixo",
        environment: "Ambiente Amplo",
        independence_level: "Baixo",
        size: "Médio",
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${tokenCuritiba}`)
      .send({
        name: "Spike 2",
        about: "Encontrado na BR 470",
        age: "Filhote",
        energy_level: "Baixo",
        environment: "Ambiente amplo",
        independence_level: "Baixo",
        size: "Pequeno",
      });

    const response = await request(app.server)
      .get("/pets")
      .query({
        city: "Blumenau",
      })
      .send();

    expect(response.body.pets).toHaveLength(1);
  });
});
