"use client"
import { createContext, ReactNode, useContext, useReducer } from "react";
import { ReduceTypeWithoutAction } from "@commonTypes/reducer";

type SideBarProviderProps = {
  children: ReactNode;
};

const SideBarContext = createContext<ReduceTypeWithoutAction<boolean>>([
  false,
  () => {
    return;
  },
]);

function isOpenReducer(state: boolean) {
  return !state;
}

function SideBarProvider({ children }: SideBarProviderProps) {
  const [isOpen, toggleSideBar] = useReducer(isOpenReducer, false);

  return (
    <SideBarContext.Provider value={[isOpen, toggleSideBar]}>
      {children}
    </SideBarContext.Provider>
  );
}

function useSideBarContext() {
  return useContext(SideBarContext);
}

export default SideBarProvider;
export { useSideBarContext };
