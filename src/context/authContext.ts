import { createContext } from "react";

export const AuthContext = createContext<{
  authId: string;
  setAuthId: (id: any) => void;
  authName: string;
  setAuthName: (id: string) => void;
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
  authToken: string;
  setAuthToken: (id: string) => void;
}>({
  authId: "",
  setAuthId: () => {},
  authName: "",
  setAuthName: () => {},
  authStatus: false,
  setAuthStatus: () => {},
  authToken: "",
  setAuthToken: () => {},
});

export const AuthProvider = AuthContext.Provider;

export default AuthContext;
