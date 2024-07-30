import fastify from "fastify";
import { orgRoutes } from "./http/controllers/orgs/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(orgRoutes);
