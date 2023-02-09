"use client";
import { StateType } from "@commonTypes/state";
import { useContext, useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { ReactNode } from "react";
import { useSideBarContext } from "./SideBarContext";

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

  const [isOpen] = useSideBarContext();
  
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
