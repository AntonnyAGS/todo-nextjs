import { Exception } from "./default.exception";

export class UnauthorizedException extends Exception {
  constructor(message?: string) {
    super(message ?? "Permissão não concedida", 401);
  }
}
