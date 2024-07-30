import { FastifyInstance } from "fastify";
import { register } from "./register";
import { login } from "./login";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/org", register);
  app.post("/login", login);
}
