import { Exception } from "./default.exception";

export class BadRequestException extends Exception {
  constructor(message?: string, err?: unknown) {
    super(message ?? "A requisição está inválida", 400, err);
  }
}
