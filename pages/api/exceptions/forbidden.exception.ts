import { Exception } from "./default.exception";

export class ForbiddenException extends Exception {
  constructor(message?: string) {
    super(message ?? "Permissão não autorizada", 403);
  }
}
