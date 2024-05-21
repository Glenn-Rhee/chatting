import { Response } from "express";
import ResponseError from "../error/response-error";
import ModelSchema from "../models/model-db";
import { toUserResponse } from "../types/responsePayload";
import {
  CreateUserRequest,
  LoginUserRequest,
  UserResponse,
} from "../types/user-model";
import Token from "../utils/generateToken";
import { UserValidation } from "../validation/user-validation";
import Validation from "../validation/Validation";
import bcrypt from "bcrypt";

export default class AuthService {
  static async create(
    req: CreateUserRequest,
    res: Response
  ): Promise<UserResponse> {
    const userValidate = Validation.validate(UserValidation.REGISTER, req);

    if (userValidate.password !== userValidate.confirmPassword) {
      throw new ResponseError(
        400,
        "Password and Confirmation Password doesn't match"
      );
    }

    const isRegister = await ModelSchema.User.findOne({
      username: userValidate.username,
    });

    if (isRegister) {
      throw new ResponseError(400, "Username already register");
    }

    const profilePict = this.getProfilePicture(
      userValidate.gender,
      userValidate.username
    );

    const hashedPassword = await bcrypt.hash(userValidate.password, 10);

    const newUser = new ModelSchema.User({
      ...userValidate,
      password: hashedPassword,
      profilePict,
    });

    const token = Token.generateTokenAndSetCookie(newUser._id, res);

    const userRegister = await newUser.save();
    return toUserResponse(
      {
        status: "success",
        message: "Successfully add one user",
        token,
      },
      {
        _id: userRegister._id,
        fullName: userRegister.fullName,
        username: userRegister.username,
        profilePict: userRegister.profilePict,
      }
    );
  }

  static async loginUser(
    req: LoginUserRequest,
    res: Response
  ): Promise<UserResponse> {
    const userValidate = Validation.validate(UserValidation.LOGIN, req);

    if (userValidate.password !== userValidate.confirmPassword) {
      throw new ResponseError(400, "Password doesn't match!");
    }

    const user = await ModelSchema.User.findOne({
      username: userValidate.username,
    });

    if (!user) {
      throw new ResponseError(404, "Username not registered!");
    }

    const isMatch = await bcrypt.compare(userValidate.password, user.password);
    if (!isMatch) {
      throw new ResponseError(400, "Password is incorrect!");
    }

    const token = Token.generateTokenAndSetCookie(user._id, res);

    return toUserResponse(
      {
        status: "success",
        message: "Success Login",
        token,
      },
      {
        _id: user._id,
        fullName: user.fullName,
        profilePict: user.profilePict,
        username: user.username,
      }
    );
  }

  static getProfilePicture(
    gender: "male" | "female",
    username: string
  ): string {
    return gender === "male"
      ? `https://avatar.iran.liara.run/public/boy?username=${username}`
      : `https://avatar.iran.liara.run/public/girl?username=${username}`;
  }
}
