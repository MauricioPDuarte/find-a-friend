import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Create pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Spike",
        about: "Foi encontrado na BR 470",
        age: "Filhote",
        size: "Grande",
        energy_level: "Baixo",
        independence_level: "Baixo",
        environment: "Ambiente Amplo",
      });

    expect(response.status).toEqual(201);
  });
});
