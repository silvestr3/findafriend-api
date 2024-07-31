import { FastifyInstance } from "fastify";
import { register } from "./register";
import { verifyJWT } from "../../middlewares/check-jwt";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets/register", { onRequest: [verifyJWT] }, register);
}
