import { CSSProperties } from "react";

export type Renderable = string | JSX.Element | null;

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type Toast = {
  style?: CSSProperties;
  id: string;
  icon?: Renderable | undefined;
  duration?: number | undefined;
  ariaProps: {
    role: "status" | "alert";
    "aria-live": "assertive" | "polite";
  };
  className?: string | undefined;
  position?: ToastPosition | undefined;
};
