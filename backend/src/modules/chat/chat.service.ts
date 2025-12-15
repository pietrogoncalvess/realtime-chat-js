import { inject, injectable } from "tsyringe";
import { Message } from "../../models/Message";
import { ICreateMessageDTO } from "./dtos/createMessageDTO";
import { UsersService } from "../users/users.service";
import { isValidObjectId } from "mongoose";
import { io } from "../../server";

@injectable()
class ChatService {
  constructor(
    @inject(UsersService)
    private readonly usersService: UsersService
  ) {}

  async findMessagesByChatId(chatId: string): Promise<InstanceType<typeof Message>[]> {
    const messages = await Message.find({
      $or: [{ to: chatId }, { from: chatId }],
    }).sort({ createdAt: 1 });
    return messages;
  }

  async createMessage(data: ICreateMessageDTO & { from: string }) {
    const isValidIds = isValidObjectId(data.from) && isValidObjectId(data.to) && data.from !== data.to;

    if (!isValidIds) {
      throw new Error("Invalid users");
    }

    const [fromExists, toExists] = await Promise.all([this.usersService.findById(data.from), this.usersService.findById(data.to)]);

    if (!fromExists || !toExists) {
      throw new Error("User does not exist");
    }

    const message = Message.create(data);

    io.emit("receive_message", data);

    return message;
  }
}

export { ChatService };
