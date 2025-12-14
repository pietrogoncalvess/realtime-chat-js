import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { validateBody } from "../../utils";
import { CreateUserDTO } from "./dtos/createUserDTO";

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const body = await validateBody(request.body, CreateUserDTO);
    const teste = "";
    // const createUserUseCase = container.resolve(CreateUserUseCase)

    // await createUserUseCase.execute(
    //   {
    //     name,
    //     email,
    //     password,
    //     driver_license
    //   });

    return response.status(201).send();
  }
}

export { UsersController };
