import { Document, Types } from "mongoose";

export interface UserSchema {
  fullName: string;
  username: string;
  password: string;
  gender: "male" | "female";
  profilePict?: string;
}

export interface UserMessage extends Document {
  fullName: string;
  username: string;
  password: string;
  gender: "male" | "female";
  profilePict?: string;
}

export interface MessageSchema {
  idUser: Types.ObjectId;
  messages: MessageReceiver[];
}

export interface MessageReceiver extends MessagesUser {
  receiverId: Types.ObjectId;
}

export interface MessagesUser {
  idMsg: string;
  message: string;
  createdAt?: Date;
}

export interface MessagesConversation extends MessagesUser {
  senderId: Types.ObjectId | string;
}

export interface ConversationSchema {
  participants: {
    senderId: string | Types.ObjectId;
    receiverId: string | Types.ObjectId;
  };
  messages: MessagesConversation[];
}
