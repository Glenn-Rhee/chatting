import { DataMsg } from "./message-model";
import { DataMainUser, GetAllUsers, UserResponse } from "./user-model";

export interface ResponsePayload {
  status: "success" | "failed";
  token?: string;
  message: string;
  error?: any;
}

export function toUserResponse(
  response: ResponsePayload,
  data: UserResponse["data"]
): UserResponse {
  const dataUser: UserResponse["data"] = data
    ? {
        _id: data._id,
        fullName: data.fullName,
        profilePict: data.profilePict,
        username: data.username,
        gender: data.gender,
      }
    : null;

  return {
    ...response,
    data: dataUser,
  };
}

export function toUserResponseMessage(
  response: ResponsePayload,
  data: DataMsg["data"] | null
): DataMsg {
  // const dataRes: DataMsg | null = data ? { ...data } : null;

  // return {
  //   ...response,
  //   data: dataRes,
  // };
  if (!data) {
    return {
      data,
      ...response,
    };
  }
  return {
    ...response,
    data: {
      _id: data._id,
      messages: data.messages,
      participants: data.participants,
    },
  };
}

export function toAllUserResponse(
  response: ResponsePayload,
  data: DataMainUser[]
) {
  const dataRes: GetAllUsers["data"] | null = data ? [...data] : null;

  return {
    ...response,
    data: dataRes,
  };
}
