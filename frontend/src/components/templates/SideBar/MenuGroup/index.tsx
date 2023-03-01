"use client";
import { usePathname } from "next/navigation";
import { useSideBarContext } from "../stores/SideBarContext";
import { Tab } from "../tabs";
import css from "./styles.module.css";

interface MenuGroupProps {
	title?: string | null;
	tabs: Tab[];
}

function MenuGroup({ title, tabs }: MenuGroupProps) {
	const [sideBarOpen, toggleSideBar] = useSideBarContext();

	const currentPath = usePathname();

	const path = sideBarOpen ? css.path : css.hidePath;

	return (
		<>
			{title ? <p>{title}</p> : null}

			<ul role="group" className={css.ul}>
				{tabs.map((tab, index) =>
					tab?.to ? (
						<li
							role="none"
							key={index}
							className={css.liStyled}
							id={currentPath === tab.to ? `${css.currentPage}` : ""}
							title={tab.title}
						>
							<a href={tab.to} onClick={toggleSideBar} className={css.link}>
								<tab.icon className={css.icon} />

								<p className={`${path}`}>{tab.title}</p>
							</a>
						</li>
					) : (
						""
					)
				)}
			</ul>
		</>
	);
}

export { MenuGroup };
