import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Refresh (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/orgs").send({
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

    const cookies = authResponse.get("Set-Cookie") ?? [];

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
