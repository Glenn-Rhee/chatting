import { create } from "zustand";
import { DataUser } from "../components/Home/sidebar/ConversationList";

export interface UseComponentStore {
  isOpen: boolean;
  isChattOpen: boolean;
  dataChat: {
    _id: string | undefined;
    participants: {
      senderId: string;
      receiverId: string;
    };
    messages: Messages[] | [];
  };
  dataUser: DataUser["data"];
  chattSelected: DataUser["data"];
  setIsChattOpen: (chatt: Partial<UseComponentStore["isChattOpen"]>) => void;
  setIsOpen: (id: Partial<UseComponentStore["isOpen"]>) => void;
  setDataChat: (data: Partial<UseComponentStore["dataChat"]>) => void;
  setDataUser: (data: Partial<UseComponentStore["dataUser"]>) => void;
  setChattSelected: (data: Partial<UseComponentStore["chattSelected"]>) => void;
}

interface Messages {
  idMsg: string;
  senderId: string;
  message: string;
  _id: string;
  createdAt: Date;
}

export const useComponentStore = create<UseComponentStore>((set) => ({
  isOpen: false,
  dataChat: {
    _id: "",
    participants: {
      senderId: "",
      receiverId: "",
    },
    messages: [],
  },
  dataUser: {
    _id: "",
    fullName: "",
    gender: "male",
    profilePict: "",
    username: "",
  },
  chattSelected: {
    _id: "",
    fullName: "",
    gender: "male",
    profilePict: "",
    username: "",
  },
  isChattOpen: false,
  setIsOpen: (id) => set({ isOpen: id }),
  setIsChattOpen: (chatt) => set({ isChattOpen: chatt }),
  setDataChat: (data) =>
    set((state) => ({
      dataChat: {
        ...state.dataChat,
        ...data,
      },
    })),
  setDataUser: (data) =>
    set((state) => ({
      dataUser: {
        ...state.dataUser,
        ...data,
      },
    })),
  setChattSelected: (data) =>
    set((state) => ({
      chattSelected: {
        ...state.chattSelected,
        ...data,
      },
    })),
}));
