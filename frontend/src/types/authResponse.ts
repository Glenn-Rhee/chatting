export interface AuthResponse extends ResponsePayload {
  data?: DataMainUser | null;
}

export interface DataMainUser {
  _id: string;
  fullName: string;
  username: string;
  profilePict: string | undefined;
  gender?: "male" | "female";
}

export interface ResponsePayload {
  status: "success" | "failed";
  message: string;
  token?: string;
  error?: string;
}
