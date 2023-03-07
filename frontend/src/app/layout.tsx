"use client";
import { queryClient } from "@config/queryClient";
import UserProvider from "@context/user";
import { Inter } from "@next/font/google";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "react-query";
import "../styles/globals.css";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	const html = (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<Toaster />

				{children}
			</UserProvider>
		</QueryClientProvider>
	);

	return (
		<html lang="pt-BR">
			<head />
			<body className={css.body}>{html}</body>
		</html>
	);
}
