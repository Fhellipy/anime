import css from "../../../app/styles.module.css";
import { AsideComponent } from "./Aside";
import AsideProvider from "./stores/AsideContext";
import MenuProvider from "./stores/MenuContext";

function Aside() {
  return (
    <AsideProvider>
      <MenuProvider>
        <AsideComponent className={css.aside} />
      </MenuProvider>
    </AsideProvider>
  );
}

export default Aside;
