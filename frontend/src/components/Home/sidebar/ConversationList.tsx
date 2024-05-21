import { useEffect, useState } from "react";
import { useDataUser } from "../../../zustand/authStore";
import Conversation from "./Conversation";
import { ResponsePayload } from "../../../types/authResponse";
import { useComponentStore } from "../../../zustand/componentStore";
import NewChattButton from "../dialog/NewChattButton";
interface Message {
  idMsg: string;
  receiverId: string;
  message: string;
  _id: string;
  createdAt: Date;
}

interface MessageCollection extends ResponsePayload {
  data: DataMessages[] | [];
}

interface DataMessages {
  _id: string;
  messages: Message[];
  idUser: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface DataUser extends ResponsePayload {
  data: {
    _id: string;
    fullName: string;
    gender: "male" | "female";
    profilePict: string;
    username: string;
  };
}
export default function ConversationList() {
  const { data } = useDataUser();
  const { setDataUser } = useComponentStore();
  const [chattUsers, setChattUsers] = useState<DataMessages[] | []>([]);
  const baseUrl = import.meta.env.VITE_BE_URL;

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch(baseUrl + `/api/messages/message/${data}`, {
          method: "GET",
        });

        const dataResponse: MessageCollection = await res.json();
        if (dataResponse.status === "failed") {
          throw new Error("Failed to get message");
        }

        setChattUsers(dataResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUser = async () => {
      try {
        const response = await fetch(baseUrl + `/api/users/${data}?count=1`, {
          method: "GET",
        });

        const dataResponse: DataUser = await response.json();
        if (dataResponse.status === "failed") {
          throw new Error(dataResponse.message || "Failed to get user");
        }

        console.log(dataResponse);

        setDataUser(dataResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    getConversations();
  }, [data, baseUrl, setDataUser]);

  return (
    <div className="py-2 flex flex-col gap-2 h-full overflow-auto relative ">
      {chattUsers.length > 0 ? (
        chattUsers.map((chatt) =>
          chatt.messages.map((msg) => (
            <Conversation
              key={msg._id}
              _id={msg._id}
              createdAt={msg.createdAt}
              idMsg={msg.idMsg}
              message={msg.message}
              receiverId={msg.receiverId}
            />
          ))
        )
      ) : (
        // chattUsers.
        <div className="absolute w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <NewChattButton size={50} />
        </div>
      )}
    </div>
  );
}
