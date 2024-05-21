import { z, ZodType } from "zod";
import { CreateUserRequest, LoginUserRequest } from "../types/user-model";

export class UserValidation {
  static readonly REGISTER: ZodType<CreateUserRequest> = z.object({
    fullName: z.string({ message: "Fullname must be string" }),
    username: z
      .string({ message: "Username must be string" })
      .min(5, "Minimum of username is 5 letters"),
    password: z
      .string({ message: "Password must be a string" })
      .min(6, "Minimum of password is 6 letter(s)"),
    confirmPassword: z
      .string({ message: "Confirmation Password must be a string" })
      .min(6, "Minimum of confirmation password is 6 letter(s)"),
    gender: z.enum(["male", "female"], {
      message: "Gender must be between 'Male' and 'Female'",
    }),
    profilePict: z
      .string({ message: "Profile pict url must be a string" })
      .optional(),
  });

  static readonly LOGIN: ZodType<LoginUserRequest> = z.object({
    username: z
      .string({ message: "Username must be string" })
      .min(5, "Minimum of username is 5 letters"),
    password: z
      .string({ message: "Password must be a string" })
      .min(6, "Minimum of password is 6 letter(s)"),
    confirmPassword: z
      .string({ message: "Confirmation Password must be a string" })
      .min(6, "Minimum of confirmation password is 6 letter(s)"),
  });
}
