import { Router } from "express";
import passport from "passport";

const authenticateRoutes = Router();

authenticateRoutes.post("/auth", passport.authenticate("local"), async (req, res) => {
  return res.status(201).json({ message: "User registered successfully" });
});

export { authenticateRoutes };
