import { fastify } from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { orgsRoutes } from "./http/controllers/orgs/routes";

export const app = fastify();

app.register(orgsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: "VALIDATION_ERROR",
      message: "Validation Error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataLog/NewRelic/Sentry
  }

  return reply
    .status(500)
    .send({ error: "INTERNAL_SERVER_ERROR", message: "Internal server error" });
});
