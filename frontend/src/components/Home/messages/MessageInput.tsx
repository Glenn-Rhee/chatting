import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useDataUser } from "../../../zustand/authStore";
import { useComponentStore } from "../../../zustand/componentStore";

export default function MessageInput() {
  const [msg, setMsg] = useState<string>("");
  const { data } = useDataUser();
  const { chattSelected } = useComponentStore();

  const baseUrl = import.meta.env.VITE_BE_URL;
  const senMessage = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const message = msg.trim();
      if (message === "") return;

      const response = await fetch(
        baseUrl + `/api/messages/send/${data}?receiverId=${chattSelected._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const dataResponse = await response.json();
      console.log(dataResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="" className="px-4 my-3" onSubmit={senMessage}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Type your message..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        {msg.trim() === "" ? null : (
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <BsSend />
          </button>
        )}
      </div>
    </form>
  );
}
