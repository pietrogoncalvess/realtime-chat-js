import { IsString, MinLength } from "class-validator";

class CreateUserDTO implements ICreateUserDTO {
  @IsString()
  name!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  username!: string;
}

interface ICreateUserDTO {
  name: string;
  password: string;
  username: string;
}

export { CreateUserDTO, ICreateUserDTO };
