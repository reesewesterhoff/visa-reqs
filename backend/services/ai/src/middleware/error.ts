import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export function errorHandler(
  err: Error,
  _r: Request,
  res: Response,
  _n: NextFunction
) {
  if (err instanceof CustomError) {
    const { statusCode, errors } = err;
    res.status(statusCode).send({ errors });
  } else {
    // Catch unhandled errors
    console.error(JSON.stringify(err, null, 2));
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
  }
}
