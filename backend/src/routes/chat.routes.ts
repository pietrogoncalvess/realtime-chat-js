import { Router } from "express";
import { container, inject } from "tsyringe";
import { ChatController } from "../modules/chat/chat.controller";
import { isAuthenticated } from "../middleware";

const chatController = container.resolve(ChatController);

const chatRoutes = Router();

chatRoutes.post("/message", isAuthenticated, chatController.createMessage.bind(chatController));

export { chatRoutes };
