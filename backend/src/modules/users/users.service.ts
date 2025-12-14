import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { User } from "../../models/User";
import type { Document } from "mongoose";

@injectable()
class UsersService {
  constructor() {}

  async findByEmail(email: string): Promise<InstanceType<typeof User> | null> {
    const user = await User.findOne({ email });
    return user;
  }

  async create({ name, driver_license, email, password }: any): Promise<void> {
    //   async create({ name, driver_license, email, password }: CreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await User.create({
      name,
      email,
      password: passwordHash,
    });
  }
}

export { UsersService };
