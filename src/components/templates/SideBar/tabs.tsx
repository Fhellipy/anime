import { type Icon } from "lucide-react";
import { AiOutlineHome } from "react-icons/ai";

export interface SubTab {
  title: string;
  to: string;
}

export interface Tab {
  title: string;
  icon: Icon;
  to?: string;
  subTabs?: SubTab[];
}

const tabsProps: Record<string, Tab[]> = {
  _: [
    {
      title: "Página Inicial",
      icon: AiOutlineHome,
      to: "/home",
    },
  ],
};

export default tabsProps;
