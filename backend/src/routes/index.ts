import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { isAuthenticated } from "../middleware";
import passport from "passport";
import { chatRoutes } from "./chat.routes";

const router = Router();

router.use("/ping", (_, res) => {
  res.send("pong");
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.send();
  });
});

router.post("/auth", passport.authenticate("local"), async (req, res) => {
  return res.status(201).json({ message: "User registered successfully" });
});

router.use(isAuthenticated);

router.use("/users", usersRoutes);
router.use("/chat", chatRoutes);

export { router };
