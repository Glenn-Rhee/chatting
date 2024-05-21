import mongoose, { Types } from "mongoose";
import {
  UserSchema,
  MessageSchema,
  ConversationSchema,
} from "../types/type-model-db";

export default class ModelSchema {
  static readonly userSchema = new mongoose.Schema<UserSchema>(
    {
      fullName: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
      gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
      },
      profilePict: {
        type: String,
        default: "",
      },
    },
    { timestamps: true }
  );

  static readonly messageSchema = new mongoose.Schema<MessageSchema>(
    {
      messages: [
        {
          idMsg: {
            type: String,
            required: true,
          },
          receiverId: {
            type: Types.ObjectId,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      idUser: Types.ObjectId,
    },
    { timestamps: true }
  );

  static readonly conversationSchema = new mongoose.Schema<ConversationSchema>(
    {
      participants: {
        senderId: {
          type: Types.ObjectId,
          required: true,
        },
        receiverId: {
          type: Types.ObjectId,
          required: true,
        },
      },
      messages: [
        {
          idMsg: {
            type: String,
            required: true,
          },
          senderId: {
            type: Types.ObjectId,
            required: true,
          },
          message: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    { timestamps: true }
  );

  static User = mongoose.model("User", this.userSchema);
  static Message = mongoose.model("Message", this.messageSchema);
  static Conversation = mongoose.model("Conversation", this.conversationSchema);
}
