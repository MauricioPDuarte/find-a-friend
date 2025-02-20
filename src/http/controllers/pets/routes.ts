import { FastifyInstance } from "fastify";
import { create } from "./create";
import { fetchAvailableByCity } from "./fetch-available-by-city";
import { getById } from "./get-by-id";
import { verifyJWT } from "../../middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
  app.get("/pets", fetchAvailableByCity);
  app.get("/pets/:petId", getById);

  app.post("/pets", { onRequest: verifyJWT }, create);
}
