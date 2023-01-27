import { AiOutlineCheckCircle } from "react-icons/ai";
import toast from "react-hot-toast";

import { Renderable, Toast } from "../types";
import css from "./styles.module.css";

export function successToast(message: Renderable, options?: Partial<Toast>) {
  return toast(
    <div className={css.container}>
      <strong>{message}</strong>
    </div>,

    {
      icon: <AiOutlineCheckCircle className={css.iconSuccess} />,
      ...options,
    },
  );
}
