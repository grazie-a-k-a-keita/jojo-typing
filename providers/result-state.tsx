'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type ContextType = {
  correctTypeCount: number;
  setCorrectTypeCount: Dispatch<SetStateAction<number>>;
  missTypeCount: number;
  setMissTypeCount: Dispatch<SetStateAction<number>>;
};

const Context = createContext<ContextType>({} as ContextType);

export const ResultStateProvider = ({ children }: { children: ReactNode }) => {
  const [correctTypeCount, setCorrectTypeCount] = useState<number>(0);
  const [missTypeCount, setMissTypeCount] = useState<number>(0);

  return (
    <Context.Provider
      value={{
        correctTypeCount,
        setCorrectTypeCount,
        missTypeCount,
        setMissTypeCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useResultState = () => useContext(Context);
