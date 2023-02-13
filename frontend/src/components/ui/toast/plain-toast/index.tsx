import { customToast } from "../custom-toast";
import { Renderable, Toast } from "../types";
import css from "./styles.module.css";

export function plainToast(message: Renderable, options?: Partial<Toast>) {
  return customToast(<div className={css.container}>{message}</div>, options);
}
