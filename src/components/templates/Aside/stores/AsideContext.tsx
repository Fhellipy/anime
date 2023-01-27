"use client"
import { createContext, ReactNode, useContext, useReducer } from "react";
import { ReduceTypeWithoutAction } from "@commonTypes/reducer";

type AsideProviderProps = {
  children: ReactNode;
};

const AsideContext = createContext<ReduceTypeWithoutAction<boolean>>([
  false,
  () => {
    return;
  },
]);

function isOpenReducer(state: boolean) {
  return !state;
}

function AsideProvider({ children }: AsideProviderProps) {
  const [isOpen, toggleAside] = useReducer(isOpenReducer, false);

  return (
    <AsideContext.Provider value={[isOpen, toggleAside]}>
      {children}
    </AsideContext.Provider>
  );
}

function useAsideContext() {
  return useContext(AsideContext);
}

export default AsideProvider;
export { useAsideContext };
