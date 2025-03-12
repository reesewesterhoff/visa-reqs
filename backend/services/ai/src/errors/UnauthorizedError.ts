import { CustomError } from "./CustomError";
import { ErrorParams } from "./models";

export class UnauthorizedError extends CustomError {
  private static readonly _statusCode = 401;
  private readonly _code: number;
  private readonly _context: { [key: string]: any };

  constructor(params?: ErrorParams) {
    const { code, message } = params || {};

    super(message || "Unauthorized");
    this._code = code || UnauthorizedError._statusCode;
    this._context = params?.context || {};

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }
}
