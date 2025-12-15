import { IsString, MinLength } from "class-validator";

class CreateMessageDTO implements ICreateMessageDTO {
  @IsString()
  to!: string;

  @IsString()
  @MinLength(1)
  message!: string;
}

interface ICreateMessageDTO {
  to: string;
  message: string;
}

export { CreateMessageDTO, ICreateMessageDTO };
