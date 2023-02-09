import { SideBar as SideBarComponent } from "./SideBar";
import MenuProvider from "./stores/MenuContext";
import SideBarProvider from "./stores/SideBarContext";

function SideBar() {
  return (
    <SideBarProvider>
      <MenuProvider>
        <SideBarComponent/>
      </MenuProvider>
    </SideBarProvider>
  );
}

export default SideBar;
