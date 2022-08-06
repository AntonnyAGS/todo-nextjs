export class Exception {
  readonly message: string;
  readonly status: number;
  readonly tracking?: unknown;

  constructor(message: string, status: number, tracking?: unknown) {
    this.message = message;
    this.status = status;
    this.tracking = tracking;
  }

  toJSON() {
    return {
      message: this.message,
      status: this.status,
      tracking: this.tracking,
    };
  }
}
