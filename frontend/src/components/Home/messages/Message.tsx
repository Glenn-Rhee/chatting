import { Message } from "../../../lib/UserMessage";

interface MessageProps {
  dataMsg: Message | null;
}
export default function MessageComponent(props: MessageProps) {
  const { dataMsg } = props;

  return (
    <div className="chat chat-end">
      {dataMsg ? (
        <>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://avatar.iran.liara.run/public/boy?username=maggie123"
                alt="chat-avatar"
              />
            </div>
          </div>
          <div className="chat-bubble text-white bg-blue-500">
            {dataMsg.message}
          </div>
          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
            12:10
          </div>
        </>
      ) : null}
    </div>
  );
}
