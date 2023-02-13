import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import css from "./styles.module.css";
import { Renderable, Toast } from "../types";

export function errorToast(message: Renderable, options?: Partial<Toast>) {
  return toast(
    <div>
      <strong>{message}</strong>
    </div>,
    { icon: <AiOutlineCloseCircle className={css.iconError} />, ...options }
  );
}
