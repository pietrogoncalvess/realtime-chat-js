import { Router } from "express";
import { container, inject } from "tsyringe";
import { UsersController } from "../modules/users/users.controller";

const usersController = container.resolve(UsersController);

const usersRoutes = Router();

usersRoutes.get("/", usersController.findAll.bind(usersController));
usersRoutes.get("/online", usersController.findOnline.bind(usersController));
usersRoutes.post("/", usersController.create.bind(usersController));

export { usersRoutes };
