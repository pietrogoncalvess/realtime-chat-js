import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { UsersController } from "../modules/users/users.controller";

const usersController = new UsersController();

const authenticateRoutes = Router();

authenticateRoutes.post("/register", usersController.create);
// authenticateRoutes.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hash });
//   res.json(user);
// });

authenticateRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Usuário inválido" });

  const valid = await bcrypt.compare(password, user.password as string);
  if (!valid) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, user });
});

export { authenticateRoutes };
