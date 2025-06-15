import { createContext, ReactNode, useContext, useState } from "react";

interface CountContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const CounterContext = createContext<CountContextProps | undefined>(undefined);

export default function CountProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <CounterContext.Provider value={{ increment, decrement, count }}>
      {children}
    </CounterContext.Provider>
  );
}

export const useCount = () => {
  const context = useContext(CounterContext);
  if (!context) throw new Error("useCount must be within a count Provider");
  return context;
};
