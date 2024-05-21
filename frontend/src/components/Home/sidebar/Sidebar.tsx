import { useComponentStore } from "../../../zustand/componentStore";
import DialogBox from "../dialog/DialogBox";
import ConversationList from "./ConversationList";
import LogoutButton from "./LogoutButton";
import SearchInputs from "./SearchInputs";

export default function Sidebar() {
  const { isOpen } = useComponentStore();
  return (
    <div className="border-r w-[38rem] border-slate-500 p-4 flex flex-col">
      <SearchInputs />
      <div className="divider px-3"></div>
      <ConversationList />
      <LogoutButton />
      {isOpen ? <DialogBox /> : null}
    </div>
  );
}
