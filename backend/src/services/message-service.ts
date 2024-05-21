import { v4 } from "uuid";
import ResponseError from "../error/response-error";
import ModelSchema from "../models/model-db";
import { DataMsg, MsgPayload, SendMessage } from "../types/message-model";
import {
  toUserResponse,
  toUserResponseMessage,
} from "../types/responsePayload";
import MessageValidation from "../validation/message-validation";
import Validation from "../validation/Validation";
import { MessageReceiver, MessagesConversation } from "../types/type-model-db";
import { UserResponse } from "../types/user-model";
import { ObjectId } from "mongoose";

interface MessageCollection {
  status: "success" | "failed";
  message: string;
  data: any;
}

export default class MessageService {
  static async sendMessage(
    message: SendMessage,
    receiverId: string,
    senderId: string
  ): Promise<UserResponse> {
    const messageValidate = Validation.validate(
      MessageValidation.SENDMESSAGE,
      message
    );

    const isConversationed = await ModelSchema.Conversation.find({
      "participants.senderId": senderId,
    });

    if (isConversationed.length === 0) {
      const idMsg = `msg-${v4()}`;
      const conversation = new ModelSchema.Conversation({
        participants: {
          senderId,
          receiverId,
        },
        messages: [
          {
            idMsg,
            senderId,
            message: messageValidate.message,
          },
        ],
      });

      const isAlreadyConv = await ModelSchema.Message.findOne({
        idUser: senderId,
      });

      if (!isAlreadyConv) {
        const userMessage = new ModelSchema.Message({
          idUser: senderId,
          messages: [
            {
              idMsg,
              receiverId,
            },
          ],
        });

        await Promise.all([conversation.save(), userMessage.save()]);
      } else {
        const messages: MessageReceiver | undefined =
          isAlreadyConv.messages.find(
            (msg) => msg.receiverId.toString() === receiverId.toString()
          );

        if (!messages) {
          await ModelSchema.Message.findOneAndUpdate(
            { idUser: senderId },
            {
              $push: {
                messages: [
                  {
                    idMsg,
                    receiverId,
                  },
                ],
              },
            }
          );
        }

        await conversation.save();
      }

      return toUserResponse(
        {
          status: "success",
          message: "Berhasil menambahkan msg baru dan dokumen baru",
        },
        null
      );
    } else {
      const conversation = isConversationed.find((con) => {
        return con.participants.receiverId == receiverId;
      });

      if (!conversation) {
        throw new ResponseError(404, "Oops receiver id not found");
      }

      const idMsg = `msg-${v4()}`;

      const newMessages: MessagesConversation[] = [
        ...conversation.messages,
        {
          idMsg,
          message: messageValidate.message,
          senderId,
        },
      ];

      const updatedConvers = await ModelSchema.Conversation.findByIdAndUpdate(
        conversation._id,
        {
          $set: { messages: newMessages },
        },
        { new: true }
      );

      const oldMessages = await ModelSchema.Message.findOne({
        idUser: senderId,
      });
      console.log(oldMessages);

      if (!oldMessages) {
        throw new ResponseError(404, "User id from messages not found!");
      }

      const updatedMessages = await ModelSchema.Message.findOneAndUpdate(
        {
          idUser: senderId,
        },
        {
          $set: {
            messages: [
              {
                idMsg,
                receiverId,
              },
            ],
          },
        }
      );

      return toUserResponse(
        {
          message: "Berhasil menambahkan msg baru di dokumen lama",
          status: "success",
        },
        null
      );
    }
  }

  static async getConversations(
    receiverId: string,
    senderId: string
  ): Promise<DataMsg> {
    const dataConvUser = await ModelSchema.Conversation.find({
      "participants.senderId": senderId,
    });

    if (dataConvUser.length === 0) {
      return {
        status: "success",
        message: "Successfully get conversation",
        data: null,
      };
    }

    const dataWithReceiver = dataConvUser.find(
      (con) => con.participants.receiverId == receiverId
    );

    if (!dataWithReceiver) {
      throw new ResponseError(404, "Receiver id is not found!");
    }

    const messages: MsgPayload[] = dataWithReceiver.messages as MsgPayload[];

    return toUserResponseMessage(
      {
        status: "success",
        message: "Successfully get message(s) with id",
      },
      {
        _id: dataWithReceiver._id,
        messages,
        participants: {
          receiverId: dataWithReceiver.participants.receiverId,
          senderId: dataWithReceiver.participants.senderId,
        },
      }
    );
  }

  static async getMessage(idUser: ObjectId): Promise<MessageCollection> {
    const dataMessage = await ModelSchema.Message.find({
      idUser,
    });

    console.log(dataMessage);

    return {
      status: "success",
      message: "Successfully get message(s) with idUser",
      data: dataMessage,
    };
  }

  static async updateMessage() {}
}
