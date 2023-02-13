"use client";
import { Inter } from "@next/font/google";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { RiCloseFill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { Config } from "./Config";
import { MenuGroup } from "./MenuGroup";
import { useSideBarContext } from "./stores/SideBarContext";
import css from "./styles.module.css";
import tabsProps from "./tabs";

const inter = Inter({ subsets: ["latin"] });

function SideBar() {
  const [sideBarOpen, toggleSideBar] = useSideBarContext();
  const refSideBar = useRef<HTMLDivElement>(null);

  function toggleSideBarForNotOpen() {
    if (!sideBarOpen) toggleSideBar();
  }

  const animateVariants: Variants = {
    open: {
      width: "12rem",
    },
    closed: {
      width: "3.5rem",
    },
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (refSideBar.current && !refSideBar.current.contains(event.target)) {
        if (sideBarOpen) toggleSideBar();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideBarOpen, refSideBar, toggleSideBar]);

  return (
    <motion.div
      ref={refSideBar}
      className={css.sideNav}
      variants={animateVariants}
      animate={sideBarOpen ? "open" : "closed"}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <motion.button
        className={css.buttonOpen}
        onClick={(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          ev.stopPropagation();
          toggleSideBar();
        }}
      >
        {sideBarOpen ? <RiCloseFill /> : <RxHamburgerMenu />}
      </motion.button>

      <aside className={css.aside} onClick={toggleSideBarForNotOpen}>
        <nav className={css.nav}>
          {Object.entries(tabsProps).map(([key, tabs]) => {
            return (
              <MenuGroup
                key={key}
                title={key.startsWith("_") ? null : key}
                tabs={tabs}
              />
            );
          })}
        </nav>

        <Config />
      </aside>
    </motion.div>
  );
}

export { SideBar };
