import passport from "passport";
import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { isAuthenticated } from "../middleware";
import { chatRoutes } from "./chat.routes";
import { UserStatus } from "../models/UserStatus";
import { User } from "../models/User";

const router = Router();

router.use("/ping", (_, res) => {
  res.send("pong");
});

router.post("/logout", (req, res, next) => {
  const user = req.user as InstanceType<typeof User>;
  UserStatus.deleteOne({ userId: user.id }).exec();

  req.logout((err) => {
    if (err) return next(err);

    res.send();
  });
});

router.post("/auth", passport.authenticate("local"), async (req, res) => {
  return res.status(201).json({ message: "User registered successfully" });
});

router.get("/me", isAuthenticated, (req, res) => {
  res.json(req.user);
});

router.use(isAuthenticated);

router.use("/users", usersRoutes);
router.use("/chat", chatRoutes);

export { router };
