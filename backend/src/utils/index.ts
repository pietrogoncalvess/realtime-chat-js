import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

type ValidationErrorResponse = {
  field: string;
  messages: string[];
};

export async function validateBody<T extends object>(body: unknown, dtoClass: new () => T): Promise<T> {
  const dto = plainToInstance(dtoClass, body);

  const errors = await validate(dto, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    const formattedErrors: ValidationErrorResponse[] = errors.map((error) => ({
      field: error.property,
      messages: error.constraints ? Object.values(error.constraints) : ["Valor inválido"],
    }));

    const errorsMessages = formattedErrors.map((err) => `${err.field}: ${err.messages.join(", ")}`).join("\n ");

    const err: any = new Error("Validation failed: \n" + errorsMessages);
    err.statusCode = 400;

    throw err;
  }

  return dto;
}
