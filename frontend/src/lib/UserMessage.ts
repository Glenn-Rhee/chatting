import { DataUser } from "../components/Home/sidebar/ConversationList";
import { ResponsePayload } from "../types/authResponse";
import { UseComponentStore } from "../zustand/componentStore";

interface ResponseConversations extends ResponsePayload {
  data: {
    _id: string;
    participants: {
      receiverId: string;
      senderId: string;
    };
    messages: Message[];
  };
}

export interface Message {
  _id: string;
  createdAt: Date;
  idMsg: string;
  message: string;
  senderId: string;
}

export default class UserMessage {
  static readonly BASEURL = import.meta.env.VITE_BE_URL;

  static async getReceiverUser(
    token: string | null,
    receiverId: string | undefined,
    setChattSelected: (
      data: Partial<UseComponentStore["chattSelected"]>
    ) => void
  ): Promise<void> {
    try {
      const response = await fetch(
        this.BASEURL + `/api/users/${token}?count=1&receiverId=${receiverId}`,
        {
          method: "GET",
        }
      );

      const dataResponse: DataUser = await response.json();
      if (dataResponse.status === "failed") {
        throw new Error(dataResponse.message || "Something went wrong");
      }

      setChattSelected({ ...dataResponse.data });
    } catch (error) {
      console.log(error);
    }
  }

  static async getConversations(
    token: string | null,
    receiverId: string,
    setDataChat: UseComponentStore["setDataChat"]
  ): Promise<void> {
    try {
      const response = await fetch(
        this.BASEURL +
          `/api/messages/conversations/${token}?receiverId=${receiverId}`
      );

      const dataResponse: ResponseConversations = await response.json();
      if (dataResponse.status === "failed") {
        throw new Error(dataResponse.message || "Something went wrong");
      }

      setDataChat({
        _id: dataResponse.data._id,
        participants: dataResponse.data.participants,
        messages: dataResponse.data.messages,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
