import { useEffect, useState } from "react";
import { useDataUser } from "../../../zustand/authStore";
import { DataMainUser, ResponsePayload } from "../../../types/authResponse";
import UserMessage from "../../../lib/UserMessage";
import { useComponentStore } from "../../../zustand/componentStore";

interface ConversationProps {
  _id: string;
  createdAt: Date;
  idMsg: string;
  message: string;
  receiverId: string;
}

interface ResponseUser extends ResponsePayload {
  data: DataMainUser;
}

export default function Conversation(props: ConversationProps) {
  const { idMsg, receiverId } = props;
  const { data } = useDataUser();
  const {
    setIsOpen,
    setDataChat,
    setIsChattOpen,
    setChattSelected,
    chattSelected,
  } = useComponentStore();
  const [dataUserMsg, setDataUserMsg] = useState<DataMainUser | null>(null);

  useEffect(() => {
    const getDataUser = async () => {
      const baseUrl = import.meta.env.VITE_BE_URL;

      try {
        const response = await fetch(
          baseUrl + `/api/users/user/${data}?id=${receiverId}`
        );

        const dataUser: ResponseUser = await response.json();
        if (dataUser.status === "failed") {
          throw new Error(dataUser.message || "Failed to get user");
        }

        console.log(dataUser);

        setDataUserMsg(dataUser.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDataUser();
  }, [idMsg, receiverId, data]);

  return (
    <>
      <div
        className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer"
        onClick={async () => {
          await UserMessage.getReceiverUser(
            data,
            dataUserMsg?._id,
            setChattSelected
          );
          await UserMessage.getConversations(
            data,
            chattSelected._id,
            setDataChat
          );
          setIsChattOpen(true);
          setIsOpen(false);
        }}
      >
        <div className="avatar online ">
          <div className="w-12 rounded-full ">
            <img
              src={dataUserMsg?.profilePict}
              alt={`Profil ${dataUserMsg?.username}`}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 ">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{dataUserMsg?.username}</p>
            <span className="text-xl">🍟</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </>
  );
}
