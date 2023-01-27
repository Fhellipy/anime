import toast from "react-hot-toast";
import { Renderable, Toast } from "../types";

export function customToast(
  message: Renderable,
  options?: Partial<Toast>,
): string {
  return toast.custom(message, options);
}
