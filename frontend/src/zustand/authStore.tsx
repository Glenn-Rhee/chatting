import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

export interface UseSignup {
  formDataSignup: {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
  };
  setFormDataSignup: (data: Partial<UseSignup["formDataSignup"]>) => void;
}

interface UseAuth {
  errorMsg: string;
  setErrorMsg: (msg: string) => void;
}

export const useAuth = create<UseAuth>((set) => ({
  errorMsg: "",
  setErrorMsg: (msg) => set(() => ({ errorMsg: msg })),
}));

export const useSignup = create<UseSignup>((set) => ({
  formDataSignup: {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  },
  setFormDataSignup: (data) =>
    set((state) => ({
      formDataSignup: {
        ...state.formDataSignup,
        ...data,
      },
    })),
}));

export interface UseLogin {
  formDataLogin: {
    username: string;
    password: string;
    confirmPassword: string;
  };
  setFormDataLogin: (data: Partial<UseLogin["formDataLogin"]>) => void;
}

export const useLogin = create<UseLogin>((set) => ({
  formDataLogin: {
    username: "",
    password: "",
    confirmPassword: "",
  },
  setFormDataLogin: (data) =>
    set((state) => ({
      formDataLogin: {
        ...state.formDataLogin,
        ...data,
      },
    })),
}));

export interface DataUser {
  data: string | null;
  setData: (data: string | null) => void;
}

type MyPersist = (
  config: StateCreator<DataUser>,
  options: PersistOptions<DataUser>
) => StateCreator<DataUser>;

export const useDataUser = create<DataUser>(
  (persist as MyPersist)(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
    }),
    {
      name: "chat-user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
