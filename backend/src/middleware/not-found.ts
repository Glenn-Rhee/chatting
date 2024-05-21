import { NextFunction, Request, Response } from "express";
import { toUserResponse } from "../types/responsePayload";

export const notFound = (_req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json(
    toUserResponse(
      {
        status: "failed",
        message: "Path you are looking for is not Found",
      },
      null
    )
  );
};
