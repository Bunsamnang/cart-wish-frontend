import { createContext, ReactNode, useState } from "react";

interface OpenModalContextType {
  openLoginModal: boolean;
  setOpenLoginModal: (open: boolean) => void;
  redirectFrom: string;
  setRedirectFrom: (from: string) => void;
}

const OpenModalContext = createContext<OpenModalContextType | undefined>(
  undefined
);

export const OpenModalProvider = ({ children }: { children: ReactNode }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [redirectFrom, setRedirectFrom] = useState("");

  return (
    <OpenModalContext.Provider
      value={{
        openLoginModal,
        setOpenLoginModal,
        redirectFrom,
        setRedirectFrom,
      }}
    >
      {children}
    </OpenModalContext.Provider>
  );
};

export default OpenModalContext;
