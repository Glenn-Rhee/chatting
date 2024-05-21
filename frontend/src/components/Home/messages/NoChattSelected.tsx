import { TiMessage } from "react-icons/ti";
import { useComponentStore } from "../../../zustand/componentStore";
// import { useDataUser } from "../../../zustand/authStore";

export default function NoChattSelected() {
  // const { data } = useDataUser();
  const { dataUser } = useComponentStore();
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center w-full h-full sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center justify-center gap-2">
        <p>Welcome 👋 {dataUser.username}</p>
        <p>Select chatt to start message</p>
        <TiMessage className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
}
