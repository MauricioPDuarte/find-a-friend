import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { hash } from "node_modules/bcryptjs";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: "Org",
      author_name: "Mauricio Duarte",
      cep: "89056-540",
      city: "Blumenau",
      email: "blumenau@org.com.br",
      latitude: 1,
      longitude: 1,
      neighborhood: "Fortaleza",
      password: "123456",
      state: "SC",
      street: "Edmundo Goldacker",
      whatsapp: "47988638307",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "blumenau@org.com.br",
      password: "123456",
    });

    expect(authResponse.body).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    );
  });
});
