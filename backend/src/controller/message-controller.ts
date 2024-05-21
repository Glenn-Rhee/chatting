import { NextFunction, Request, Response } from "express";
import { SendMessage } from "../types/message-model";
import { RequestProtectRoute } from "../middleware/protect-route-middleware";
import MessageService from "../services/message-service";

export default class MessageController {
  static async sendMessage(
    req: RequestProtectRoute,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody: SendMessage = req.body as SendMessage;
      const receiverId = req.query.receiverId as string;
      const senderId = req.user?._id;

      const response = await MessageService.sendMessage(
        requestBody,
        receiverId,
        senderId
      );

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getConversations(
    req: RequestProtectRoute,
    res: Response,
    next: NextFunction
  ) {
    try {
      const receiverId = req.query.receiverId! as string;
      const senderId = req.user?._id;

      const response = await MessageService.getConversations(
        receiverId,
        senderId
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getMessage(
    req: RequestProtectRoute,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;

      const response = await MessageService.getMessage(user?.id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
