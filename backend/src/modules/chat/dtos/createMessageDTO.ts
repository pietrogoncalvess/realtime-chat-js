import { IsString, MinLength } from "class-validator";

class CreateMessageDTO implements ICreateMessageDTO {
  @IsString()
  from!: string;

  @IsString()
  to!: string;

  @IsString()
  @MinLength(1)
  message!: string;
}

interface ICreateMessageDTO {
  from: string;
  to: string;
  message: string;
}

export { CreateMessageDTO, ICreateMessageDTO };
