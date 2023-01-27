import Link from "next/link";
import css from "./styles.module.css";
import { FaUser } from "react-icons/fa";

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  return (
    <div className={`${css.header} ${className}`}>
      <FaUser className={css.icon}/>

      <p className={css.text}>Fhellipy</p>
    </div>
  );
}

export { Header };
