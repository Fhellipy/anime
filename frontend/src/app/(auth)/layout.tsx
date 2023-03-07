"use client";
import { Inter } from "@next/font/google";
import "@styles/globals.css";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayoutLayout({ children }: AuthLayoutProps) {
	return <div className={css.container}>{children}</div>;
}
