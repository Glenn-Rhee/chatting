import { Document, ObjectId, Types } from "mongoose";
import { ResponsePayload } from "./responsePayload";

export interface SendMessage {
  message: string;
}

export interface DataMsg extends ResponsePayload {
  data: {
    _id: Types.ObjectId;
    participants: {
      senderId: string | Types.ObjectId;
      receiverId: string | Types.ObjectId;
    };
    messages: MsgPayload[] | null | undefined;
  } | null;
}

export interface MsgPayload {
  idMsg: string;
  senderId: Types.ObjectId;
  message: string;
  _id: Types.ObjectId;
  createdAt: Date;
}
