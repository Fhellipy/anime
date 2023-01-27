"use client";
import { StateType } from "@commonTypes/state";
import { useContext, useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { ReactNode } from "react";
import { useAsideContext } from "./AsideContext";

type MenuProviderProps = {
  children: ReactNode;
};

const MenuContext = createContext<StateType<string>>([
  "",
  () => {
    return;
  },
]);

function MenuProvider({ children }: MenuProviderProps) {
  const [menu, setMenu] = useState("");

  const [isOpen] = useAsideContext();
  
  useEffect(() => {
    if (!isOpen) setMenu("");
  }, [isOpen]);
  
  return (
    <MenuContext.Provider value={[menu, setMenu]}>
      {children}
    </MenuContext.Provider>
  );
}

function useMenuContext() {
  return useContext(MenuContext);
}

export default MenuProvider;
export { useMenuContext };
