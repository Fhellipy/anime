import Link from "next/link";
import { useAsideContext } from "../stores/AsideContext";
import { VscSettingsGear } from "react-icons/vsc";
import css from "./styles.module.css";
import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

function Config() {
  const [asideOpen, toggleAside] = useAsideContext();

  const pathName = usePathname();

  const showLink = asideOpen ? css.linkStyled : css.link;

  const animateVariants: Variants = {
    open: {
      opacity: 100,
    },
    closed: {
      opacity: 0,
      display: "none",
    },
  };

  return (
    <span
      className={css.span}
      id={pathName === "/configuration" ? `${css.currentPage}` : ""}
    >
      <VscSettingsGear className={css.icon} />

      <motion.a
        href="/configuration"
        onClick={toggleAside}
        className={`${showLink}`}
        variants={animateVariants}
        animate={asideOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        Configurações
      </motion.a>
    </span>
  );
}

export { Config };
