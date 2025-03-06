import { CustomError } from "./CustomError";

export class ForbiddenError extends CustomError {
  private static readonly _statusCode = 401;
  private readonly _code: number;
  private readonly _context: { [key: string]: any };

  constructor(params?: {
    code?: number;
    message?: string;
    context?: { [key: string]: any };
  }) {
    const { code, message } = params || {};

    super(message || "Forbidden");
    this._code = code || ForbiddenError._statusCode;
    this._context = params?.context || {};

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }
}
