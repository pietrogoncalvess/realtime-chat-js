import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/ping", (_, res) => {
  res.send("pong");
});
router.use("/users", usersRoutes);
router.use(authenticateRoutes);

export { router };
