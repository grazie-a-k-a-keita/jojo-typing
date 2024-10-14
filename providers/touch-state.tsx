'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type ContextType = {
  isTouch: boolean;
  setIsTouch: Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<ContextType>({} as ContextType);

export const TouchStateProvider = ({ children }: { children: ReactNode }) => {
  const [isTouch, setIsTouch] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        isTouch,
        setIsTouch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTouchState = () => useContext(Context);
