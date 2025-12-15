import { container } from "tsyringe";
import { UsersService } from "../../modules/users/users.service";

container.registerSingleton(UsersService, UsersService);
