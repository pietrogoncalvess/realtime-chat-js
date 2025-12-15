import { Router } from "express";
import { container, inject } from "tsyringe";
import { ChatController } from "../modules/chat/chat.controller";

const chatController = container.resolve(ChatController);

const chatRoutes = Router();

chatRoutes.post("/message", chatController.createMessage.bind(chatController));
chatRoutes.get("/:chatId/messages", chatController.findMessages.bind(chatController));

export { chatRoutes };
