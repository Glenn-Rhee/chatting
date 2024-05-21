import { NextFunction, Request, Response } from "express";
import { CreateUserRequest, LoginUserRequest } from "../types/user-model";
import AuthService from "../services/auth-service";
import { toUserResponse } from "../types/responsePayload";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const requestBody: LoginUserRequest = req.body as LoginUserRequest;

      const response = await AuthService.loginUser(requestBody, res);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const requestBody: CreateUserRequest = req.body as CreateUserRequest;

      const response = await AuthService.create(requestBody, res);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async logout(_req: Request, res: Response, next: NextFunction) {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      return res.status(200).json(
        toUserResponse(
          {
            status: "success",
            message: "Logout successfully",
          },
          null
        )
      );
    } catch (error) {
      next(error);
    }
  }
}
