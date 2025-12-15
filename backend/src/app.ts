import express from "express";
import cors from "cors";
import { router } from "./routes";
import session from "express-session";
import passport from "./config/passport";

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

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

export default app;
