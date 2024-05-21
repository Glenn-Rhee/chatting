import { BiLogOut } from "react-icons/bi";
import { useAuth, useDataUser } from "../../../zustand/authStore";

export default function LogoutButton() {
  const baseUrl = import.meta.env.VITE_BE_URL;

  const { setErrorMsg } = useAuth();
  const { setData } = useDataUser();
  const handleLogOut = async () => {
    try {
      const res = await fetch(baseUrl + "/api/auth/logout", {
        method: "POST",
      });

      const data: {
        status: "success" | "failed";
        message: string;
      } = await res.json();

      if (data.status === "failed") {
        throw new Error(data.message || "Failed to log out");
      }

      setData(null);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error.message || "Internal Server Error!");
    } finally {
      setTimeout(() => {
        setErrorMsg("");
      }, 1500);
    }
  };
  return (
    <button className="mt-auto" onClick={handleLogOut}>
      <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
    </button>
  );
}
