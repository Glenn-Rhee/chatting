import UserMessage from "../../../lib/UserMessage";
import { useDataUser } from "../../../zustand/authStore";
import { useComponentStore } from "../../../zustand/componentStore";
interface ContactProps {
  username: string;
  profilePict: string;
  _id: string;
}

export default function Contact(props: ContactProps) {
  const { username, profilePict, _id } = props;
  const { data } = useDataUser();
  const {
    setIsOpen,
    setDataChat,
    setIsChattOpen,
    setChattSelected,
    chattSelected,
  } = useComponentStore();

  return (
    <div
      className="mt-4 flex items-center gap-x-4 hover:bg-white/20 transition-colors duration-75 rounded-lg"
      role="button"
      onClick={async () => {
        await UserMessage.getReceiverUser(data, _id, setChattSelected);
        await UserMessage.getConversations(
          data,
          chattSelected._id,
          setDataChat
        );
        setIsChattOpen(true);
        setIsOpen(false);
      }}
    >
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img src={profilePict} />
        </div>
      </div>
      <h3>{username}</h3>
    </div>
  );
}
