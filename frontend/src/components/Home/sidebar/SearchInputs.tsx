import { FaSearch } from "react-icons/fa";
import NewChattButton from "../dialog/NewChattButton";

export default function SearchInputs() {
  return (
    <div className="flex gap-1">
      <form action="" className="flex items-center gap-2 w-full">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered rounded-full w-[85%]"
        />
        <button className="btn btn-circle bg-sky-500 text-white" type="submit">
          <FaSearch />
        </button>
      </form>
      <NewChattButton size={45} />
    </div>
  );
}
