import express from "express";
import cors from "cors";
import { router } from "./routes";
import passport from "./config/passport";

export function createApp(sessionMiddleware: any) {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        callback(null, origin);
      },
      credentials: true,
    })
  );

  app.use(express.json());

  app.use(sessionMiddleware);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(router);

  return app;
}
