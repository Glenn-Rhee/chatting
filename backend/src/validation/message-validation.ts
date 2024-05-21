import { z, ZodType } from "zod";
import { SendMessage } from "../types/message-model";

export default class MessageValidation {
  static readonly SENDMESSAGE: ZodType<SendMessage> = z.object({
    message: z.string({ message: "Message must be a string" }),
  });
}
