import { FaPlus } from "react-icons/fa";
import { useComponentStore } from "../../../zustand/componentStore";

interface NewChattButtonProps {
  size: number;
}

export default function NewChattButton(props: NewChattButtonProps) {
  const { size } = props;
  const { setIsOpen } = useComponentStore();

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <button
        className=" text-white border-none outline-none"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        type="button"
      >
        <FaPlus
          className="relative cursor-pointer hover:bg-black hover:text-white transition-colors bg-sky-500 p-3 text-sm rounded-full text-white"
          size={size}
        />
      </button>
    </div>
  );
}
