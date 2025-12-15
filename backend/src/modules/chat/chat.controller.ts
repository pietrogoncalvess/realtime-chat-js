import { Request, response, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import { validateBody } from "../../utils";
import { CreateMessageDTO } from "./dtos/createMessageDTO";
import { ChatService } from "./chat.service";
import { User } from "../../models/User";

@injectable()
class ChatController {
  constructor(
    @inject(ChatService)
    private readonly chatService: ChatService
  ) {}

  async createMessage(request: Request, response: Response): Promise<Response> {
    try {
      const body = await validateBody(request.body, CreateMessageDTO);

      const user = request.user as InstanceType<typeof User>;

      const message = await this.chatService.createMessage({ ...body, from: user._id.toString() });

      return response.status(201).json(message);
    } catch (error) {
      return response.status(400).json({ message: (error as Error).message });
    }
  }

  async findMessages(request: Request, response: Response): Promise<Response> {
    const { chatId } = request.params;

    const messages = await this.chatService.findMessagesByChatId(chatId);

    return response.status(200).json(messages);
  }
}

export { ChatController };
