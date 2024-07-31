import { FastifyInstance } from "fastify";
import { register } from "./register";
import { verifyJWT } from "../../middlewares/check-jwt";
import { fetch } from "./fetch";
import { find } from "./find";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets/register", { onRequest: [verifyJWT] }, register);
  app.get("/pets", fetch);
  app.get("/pets/:id", find);
}
