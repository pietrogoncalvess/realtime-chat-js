import { injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { User } from "../../models/User";
import { ICreateUserDTO } from "./dtos/createUserDTO";
import { UserStatus } from "../../models/UserStatus";

@injectable()
class UsersService {
  constructor() {}

  async findAll(): Promise<InstanceType<typeof User>[]> {
    const users = await User.find().select("-password");
    return users;
  }

  async findByUsername(username: string): Promise<InstanceType<typeof User> | null> {
    const user = await User.findOne({ username });
    return user;
  }

  async findById(id: string): Promise<InstanceType<typeof User> | null> {
    const user = await User.findById(id);
    return user;
  }

  async findOnline(): Promise<string[]> {
    const onlineUsers = await UserStatus.find();
    return onlineUsers.map((status) => status.userId) as string[];
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
