import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

export function createSessionMiddleware() {
  return session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      client: mongoose.connection.getClient(), // agora GARANTIDO
      collectionName: "sessions",
      ttl: 60 * 60 * 24,
      autoRemove: "native",
    }),

    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  });
}
