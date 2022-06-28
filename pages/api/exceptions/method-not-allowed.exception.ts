import { Exception } from "./default.exception";

export class MethodNotAllowedException extends Exception {
  constructor() {
    super("Este recurso não possui essa operação", 405);
  }
}
