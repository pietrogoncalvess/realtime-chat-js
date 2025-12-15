import { inject, injectable } from "tsyringe";
import { Message } from "../../models/Message";
import { ICreateMessageDTO } from "./dtos/createMessageDTO";
import { User } from "../../models/User";
import { UsersService } from "../users/users.service";
import { isValidObjectId } from "mongoose";
import { io } from "../../server";

@injectable()
class ChatService {
  constructor(
    @inject(UsersService)
    private readonly usersService: UsersService
  ) {}

  async createMessage(data: ICreateMessageDTO) {
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
