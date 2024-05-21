import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default class Token {
  static generateTokenAndSetCookie(userId: Types.ObjectId, res: Response) {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET || "abclimadasar",
      { expiresIn: "15d" }
    );

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return token;
  }
}
