'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type ContextType = {
  auth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<ContextType>({} as ContextType);

export const ManagementStateProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useManagementState = () => useContext(Context);
