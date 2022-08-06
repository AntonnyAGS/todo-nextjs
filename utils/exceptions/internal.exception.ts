import { Exception } from "./default.exception";

export class InternalException extends Exception {
  constructor(err?: unknown) {
    super("Não foi possível cadastrar o usuário", 500, err);
  }
}
