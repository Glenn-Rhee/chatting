import { Types } from "mongoose";
import ModelSchema from "../models/model-db";
import { DataMainUser, GetAllUsers } from "../types/user-model";
import { toAllUserResponse, toUserResponse } from "../types/responsePayload";
import ResponseError from "../error/response-error";

export default class UserService {
  static async getUsers(
    userId: Types.ObjectId,
    queryUser: string | undefined,
    receiverId: string | undefined
  ): Promise<GetAllUsers> {
    if (queryUser) {
      let user: DataMainUser = await ModelSchema.User.findOne({
        _id: userId,
      }).select("_id fullName username gender profilePict");

      if (receiverId) {
        user = await ModelSchema.User.findById(receiverId).select(
          "_id fullName username gender profilePict"
        );
      }

      return {
        status: "success",
        message: "Success get all users",
        data: {
          _id: user._id,
          fullName: user.fullName,
          profilePict: user.profilePict,
          username: user.username,
          gender: user.gender,
        },
      };
    }

    // mengambil semua data user yang id nya tidak sama dengan userId
    const users: DataMainUser[] = await ModelSchema.User.find({
      _id: { $ne: userId },
    }).select("_id fullName username gender profilePict");

    return toAllUserResponse(
      {
        status: "success",
        message: "Success get all users",
      },
      users
    );
  }

  static async getUser(id: string) {
    const data = await ModelSchema.User.findById(id);

    if (!data) {
      throw new ResponseError(404, "User Tidak ditemukan");
    }

    return toUserResponse(
      {
        status: "success",
        message: "Success get one user by id",
      },
      {
        _id: data.id,
        fullName: data.fullName,
        profilePict: data.profilePict,
        username: data.username,
        gender: data.gender,
      }
    );
  }
}
