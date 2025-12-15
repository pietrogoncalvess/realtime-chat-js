import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { isAuthenticated } from "../middleware";

const router = Router();

router.use("/ping", isAuthenticated, (_, res) => {
  res.send("pong");
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.send();
  });
});

router.use("/users", usersRoutes);
router.use(authenticateRoutes);

export { router };
