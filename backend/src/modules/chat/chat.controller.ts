import { Request, response, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import { validateBody } from "../../utils";
import { CreateMessageDTO } from "./dtos/createMessageDTO";
import { ChatService } from "./chat.service";

@injectable()
class ChatController {
  constructor(
    @inject(ChatService)
    private readonly chatService: ChatService
  ) {}

  async createMessage(request: Request, response: Response): Promise<Response> {
    try {
      const body = await validateBody(request.body, CreateMessageDTO);

      const message = await this.chatService.createMessage(body);

      return response.status(201).json(message);
    } catch (error) {
      return response.status(400).json({ message: (error as Error).message });
    }
  }
}

export { ChatController };
