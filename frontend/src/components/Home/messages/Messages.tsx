import { useComponentStore } from "../../../zustand/componentStore";
import Message from "./Message";

export default function Messages() {
  const { dataChat } = useComponentStore();

  return (
    <div className="px-4 flex-1 overflow-auto">
      {dataChat.messages.length > 0 ? (
        <>
          {dataChat.messages.map((message) => (
            <Message key={message._id} dataMsg={message} />
          ))}
        </>
      ) : null}
    </div>
  );
}
