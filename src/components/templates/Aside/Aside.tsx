"use client";
import { MenuGroup } from "./MenuGroup";
import { useAsideContext } from "./stores/AsideContext";
import css from "./styles.module.css";
import tabsProps from "./tabs";
import { BsChevronRight } from "react-icons/bs";
import { motion, Variants } from "framer-motion";
import { Config } from "./Config";
import { useEffect, useRef } from "react";

interface AsideProps {
  className?: string;
}

function AsideComponent({ className }: AsideProps) {
  const [asideOpen, toggleAside] = useAsideContext();

  const refAside = useRef(null);

  function toggleAsideForNotOpen() {
    if (!asideOpen) toggleAside();
  }

  const asideStyled = asideOpen ? css.openAside : "";

  const animateVariants: Variants = {
    open: {
      width: "10rem",
    },
    closed: {
      width: "3rem",
    },
    openButton: {
      transform: "rotate(180deg)",
      alignSelf: "flex-end",
    },
    closedButton: {
      transform: "rotate(0deg)",
    },
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (refAside.current && !refAside.current.contains(event.target)) {
        if (asideOpen) toggleAside();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [asideOpen, refAside, toggleAside]);

  return (
    <motion.div
      ref={refAside}
      className={`${css.asideContainer} ${className}`}
      variants={animateVariants}
      animate={asideOpen ? "open" : "closed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.button
        className={css.buttonOpen}
        onClick={(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          ev.stopPropagation();
          toggleAside();
        }}
        variants={animateVariants}
        animate={asideOpen ? "openButton" : "closedButton"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <BsChevronRight />
      </motion.button>
      <aside
        className={`${css.aside}  ${asideStyled}`}
        onClick={toggleAsideForNotOpen}
      >
        <nav className={css.nav}>
          <div>
            {Object.entries(tabsProps).map(([key, tabs]) => {
              return (
                <MenuGroup
                  key={key}
                  title={key.startsWith("_") ? null : key}
                  tabs={tabs}
                />
              );
            })}
          </div>
        </nav>
        <Config />
      </aside>
    </motion.div>
  );
}

export { AsideComponent };
