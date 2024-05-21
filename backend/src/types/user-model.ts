import { Types } from "mongoose";
import { ResponsePayload } from "./responsePayload";
import { UserSchema } from "./type-model-db";

export interface CreateUserRequest extends UserSchema {
  confirmPassword: string;
}

export interface UserResponse extends ResponsePayload {
  data?: DataMainUser | null;
}

export interface DataMainUser {
  _id: Types.ObjectId;
  fullName: string;
  username: string;
  profilePict: string | undefined;
  gender?: "male" | "female";
}

export interface GetAllUsers extends ResponsePayload {
  data?: DataMainUser[] | DataMainUser | null;
}

export interface LoginUserRequest {
  username: string;
  password: string;
  confirmPassword: string;
}
