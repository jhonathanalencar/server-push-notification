import fastify from "fastify";
import cors from "@fastify/cors";

import { notificationsRoutes } from "./routes/notifications-routes";

export async function buildServer() {
  const app = fastify();
  app.register(cors);
  app.register(notificationsRoutes);

  return app;
}
