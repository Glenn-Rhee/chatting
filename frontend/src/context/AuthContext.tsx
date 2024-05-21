import { createContext, useContext } from "react";
import { DataUser, useDataUser } from "../zustand/authStore";

export const AuthContext = createContext<DataUser | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const { children } = props;
  const { data, setData } = useDataUser();

  return (
    <AuthContext.Provider value={{ data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};