import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { toUserResponse } from "../types/responsePayload";
import ResponseError from "../error/response-error";
import { MongooseError } from "mongoose";

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    const paths = error.errors.map((err) => err.path[0]);
    const messages = error.errors.map((err) => err.message);
    const errors = paths.map((path, i) => {
      return messages[i] !== "Required" ? messages[i] : `${path} is required!`;
    });

    const response = toUserResponse(
      {
        status: "failed",
        message: "Bad Request",
        error: errors,
      },
      null
    );

    return res.status(400).json(response);
  } else if (error instanceof ResponseError) {
    const response = toUserResponse(
      {
        status: "failed",
        message: error.message,
      },
      null
    );

    return res.status(error.status).json(response);
  } else if (error instanceof MongooseError) {
    const response = toUserResponse(
      {
        status: "failed",
        message: "Failed to interaction with database",
        error,
      },
      null
    );
    console.log(error);

    return res.status(500).json(response);
  } else {
    const response = toUserResponse(
      {
        status: "failed",
        message: error.message,
      },
      null
    );

    return res.status(500).json(response);
  }
};
