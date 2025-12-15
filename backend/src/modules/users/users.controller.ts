import { Request, response, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import { validateBody } from "../../utils";
import { CreateUserDTO } from "./dtos/createUserDTO";
import { UsersService } from "./users.service";

@injectable()
class UsersController {
  constructor(
    @inject(UsersService)
    private readonly usersService: UsersService
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const body = await validateBody(request.body, CreateUserDTO);

      const user = await this.usersService.create(body);

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ message: (error as Error).message });
    }
  }
}

export { UsersController };
