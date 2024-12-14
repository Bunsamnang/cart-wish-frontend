import { useContext } from "react";
import TotalContext from "../Contexts/TotalContext";

export const useTotal = () => {
  const context = useContext(TotalContext);

  if (!context) {
    throw new Error("useTotal must be used within a TotalProvider");
  }

  return context;
};
