import { Router } from "express";
import { container, inject } from "tsyringe";
import { UsersController } from "../modules/users/users.controller";

const usersController = container.resolve(UsersController);

const usersRoutes = Router();

usersRoutes.post("/", usersController.create.bind(usersController));

export { usersRoutes };
