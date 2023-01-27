"use client";
import { motion, Variants } from "framer-motion";
import { useAsideContext } from "../stores/AsideContext";
import { Tab } from "../tabs";
import css from "./styles.module.css";
import { usePathname } from "next/navigation";

interface MenuGroupProps {
  title?: string | null;
  tabs: Tab[];
}

function MenuGroup({ title, tabs }: MenuGroupProps) {
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
    <>
      {title ? <p>{title}</p> : null}

      <ul role="group" className={css.ul}>
        {tabs.map((tab, index) =>
          tab?.to ? (
            <li
              role="none"
              key={index}
              className={css.liStyled}
              id={pathName === tab.to ? `${css.currentPage}` : ""}
            >
              <tab.icon className={css.icon} />

              <motion.a
                href={tab.to}
                onClick={toggleAside}
                className={`${showLink}`}
                variants={animateVariants}
                animate={asideOpen ? "open" : "closed"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {tab.title}
              </motion.a>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </>
  );
}

export { MenuGroup };
