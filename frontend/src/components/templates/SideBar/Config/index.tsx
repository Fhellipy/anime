import { usePathname } from "next/navigation";
import { VscSettingsGear } from "react-icons/vsc";
import { useSideBarContext } from "../stores/SideBarContext";
import css from "./styles.module.css";

function Config() {
  const [sideBarOpen, toggleSideBar] = useSideBarContext();

  const currentPath = usePathname();

  const path = sideBarOpen ? css.path : css.hidePath;

  return (
    <span
      className={css.content}
      id={currentPath === "/configuration" ? `${css.currentPage}` : ""}
      title="Configurações"
    >
      <a
        href="/configuration"
        onClick={toggleSideBar}
        className={css.link}
      >
        <VscSettingsGear className={css.icon} />
        <p className={`${path}`}>Configurações</p>
      </a>
    </span>
  );
}

export { Config };
