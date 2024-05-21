import { InputGroupProps } from "../components/auth/InputGroup";

export const signupProperties: InputGroupProps[] = [
  {
    label: "Fullname",
    type: "text",
    placeHolder: "Enter your fullname",
    name: "fullName",
  },
  {
    label: "Username",
    type: "text",
    placeHolder: "Enter your username",
    name: "username",
  },
  {
    label: "Password",
    type: "password",
    placeHolder: "Enter your password",
    name: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
    placeHolder: "Confirm password",
    name: "confirmPassword",
  },
];

export const loginProperties: InputGroupProps[] = [
  {
    label: "Username",
    type: "text",
    placeHolder: "Enter your username",
    name: "username",
  },
  {
    label: "Password",
    type: "password",
    placeHolder: "Enter your password",
    name: "password",
  },
  {
    label: "Confirmation Password",
    type: "password",
    placeHolder: "Confirmation Password",
    name: "confirmPassword",
  },
];
