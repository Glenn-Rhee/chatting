import { useComponentStore } from "../../../zustand/componentStore";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChattSelected from "./NoChattSelected";

export default function MessageContainer() {
  const { isChattOpen, chattSelected } = useComponentStore();
  
  return (
    <div className="w-full flex flex-col">
      {isChattOpen ? (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">
              To :{" "}
              <span className="text-gray-900 font-bold">
                {chattSelected.username}
              </span>
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChattSelected />
      )}
    </div>
  );
}
