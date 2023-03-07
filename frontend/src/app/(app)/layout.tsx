"use client";
import { Header } from "@components/templates/Header";
import SideBar from "@components/templates/SideBar";
import { Inter } from "@next/font/google";
import "@styles/globals.css";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

interface AppLayoutProps {
	children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
	return (
		<>
			<Header />

			<div className={css.container}>
				<SideBar />
				<div className={css.content}>{children}</div>
			</div>
		</>
	);
}
