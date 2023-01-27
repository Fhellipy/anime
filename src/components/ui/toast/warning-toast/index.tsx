import toast from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import { Renderable, Toast } from "../types";

export function warningToast(message: Renderable, options?: Partial<Toast>) {
  return toast(
    <div>
      <strong>{message}</strong>
    </div>,
    {
      icon: <AiFillWarning size={24} color="orange" />,
      ...options,
    },
  );
}
