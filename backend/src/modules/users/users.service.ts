import { injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { User } from "../../models/User";
import { ICreateUserDTO } from "./dtos/createUserDTO";

@injectable()
class UsersService {
  constructor() {}

  async findByUsername(username: string): Promise<InstanceType<typeof User> | null> {
    const user = await User.findOne({ username });
    return user;
  }

  async create({ name, username, password }: ICreateUserDTO): Promise<InstanceType<typeof User>> {
    const userAlreadyExists = await this.findByUsername(username);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = (
      await User.create({
        name,
        username,
        password: passwordHash,
      })
    ).toObject();

    delete user.password;

    return user as InstanceType<typeof User>;
  }
}

export { UsersService };
