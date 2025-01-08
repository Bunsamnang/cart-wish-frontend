import { useContext } from "react";
import OpenModalContext from "../Contexts/OpenModalContext";

export const useOpen = () => {
  const context = useContext(OpenModalContext);
  if (!context) {
    throw new Error("useOpen must be used within OpenModalProvider.");
  }

  return context;
};
