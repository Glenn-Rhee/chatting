import { useEffect, useState } from "react";
import Contact from "./Contact";
import { useDataUser } from "../../../zustand/authStore";
import { ResponsePayload } from "../../../types/authResponse";
import { useComponentStore } from "../../../zustand/componentStore";

interface ResponseContacts extends ResponsePayload {
  data: ContactData[];
}

interface ContactData {
  _id: string;
  fullName: string;
  gender: "male" | "female";
  profilePict: string;
  username: string;
}

export default function DialogBox() {
  const { data } = useDataUser();
  const { isOpen, setIsOpen } = useComponentStore();
  const [contacts, setContacts] = useState<ResponseContacts["data"] | null>(
    null
  );
  const baseUrl = import.meta.env.VITE_BE_URL;

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(baseUrl + "/api/users/" + data, {
          method: "GET",
        });

        const dataResponse: ResponseContacts = await response.json();
        setContacts(dataResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [baseUrl, data]);

  return (
    <dialog
      id="my_modal_2"
      className="modal modal-bottom sm:modal-middle"
      open={isOpen}
    >
      <div className="modal-box max-w-xs">
        <h3 className="font-bold text-lg">Lists Contact!</h3>
        {contacts?.map((contact) => (
          <Contact key={contact._id} {...contact} />
        ))}

        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
