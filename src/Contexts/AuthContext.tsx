import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../Authentication/AuthModel";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token") || "";
      // it returns an object, so make an interface of those properties
      const jwtUser = jwtDecode<User>(jwt);

      // if it expires, remove the stored token
      if (jwtUser.exp && Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
      } else {
        setUser(jwtUser);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
