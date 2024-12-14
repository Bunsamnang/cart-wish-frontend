import { createContext, useState, ReactNode, useEffect } from "react";

interface TotalContextType {
  total: number;
  setTotal: (total: number) => void;
}

// create context
const TotalContext = createContext<TotalContextType | undefined>(undefined);

// create a provider component

export const TotalProvider = ({ children }: { children: ReactNode }) => {
  const [total, setTotal] = useState(() => {
    const savedTotal = localStorage.getItem("total");
    return savedTotal ? Number(savedTotal) : 0;
  });

  useEffect(() => {
    localStorage.setItem("total", total.toString());
  }, [total]);

  return (
    <TotalContext.Provider value={{ total, setTotal }}>
      {children}
    </TotalContext.Provider>
  );
};

export default TotalContext;
