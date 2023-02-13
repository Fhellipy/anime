import { Inter } from "@next/font/google";
import { FaUser } from "react-icons/fa";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

function Header() {
  return (
    <header className={css.header}>
      <FaUser className={css.icon} />

      <p className={css.text}>Fhellipy</p>
    </header>
  );
}

export { Header };
