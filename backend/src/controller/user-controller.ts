import { NextFunction, Response } from "express";
import { RequestProtectRoute } from "../middleware/protect-route-middleware";
import UserService from "../services/user-service";
import { Types } from "mongoose";

export default class UserController {
  static async getUsers(
    req: RequestProtectRoute,
    res: Response,
    next: NextFunction
  ) {
    try {
      const loggedUserId: Types.ObjectId = req.user?._id;
      const queryUser: string | undefined = req.query.count as string;
      const receiverId: string | undefined = req.query.receiverId as string;
      const response = await UserService.getUsers(
        loggedUserId,
        queryUser,
        receiverId
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(
    req: RequestProtectRoute,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.query.id as string;

      const response = await UserService.getUser(id);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
