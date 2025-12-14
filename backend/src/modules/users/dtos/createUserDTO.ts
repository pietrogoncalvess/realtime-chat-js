import { IsEmail, IsString, MinLength } from "class-validator";

class CreateUserDTO {
  @IsString()
  name!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEmail()
  email!: string;
}

export { CreateUserDTO };
