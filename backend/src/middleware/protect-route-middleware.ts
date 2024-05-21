import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { toUserResponse } from "../types/responsePayload";
import dotenv from "dotenv";
import ModelSchema from "../models/model-db";
import mongoose from "mongoose";
import { UserMessage } from "../types/type-model-db";
dotenv.config();

interface DecodedJwt {
  userId: string;
}

export interface RequestProtectRoute extends Request {
  user?: UserMessage;
}

const protectRoute = async (
  req: RequestProtectRoute,
  res: Response,
  next: NextFunction
) => {
  if (req.params.token) {
    const decoded: DecodedJwt = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET || "abclimadasar"
    ) as DecodedJwt;

    const user = await ModelSchema.User.findById(decoded.userId).select(
      "-password"
    );

    if (user) {
      req.user = user;
      next();
      return;
    }

    const response = toUserResponse(
      {
        status: "failed",
        message: "User not found!",
      },
      null
    );

    return res.status(404).json(response).end();
  }

  const response = toUserResponse(
    {
      status: "failed",
      message: "Unauthorized! Token is required",
    },
    null
  );
  return res.status(401).json(response).end();
};

export default protectRoute;
