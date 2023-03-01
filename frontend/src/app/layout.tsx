"use client";
import { Header } from "@components/templates/Header";
import SideBar from "@components/templates/SideBar";
import { TOKEN_KEY } from "@config/env/api";
import { queryClient } from "@config/queryClient";
import UserProvider from "@context/user";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { Inter } from "@next/font/google";
import { useEffect } from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "react-query";
import "../styles/globals.css";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	const [token] = useLocalStorage(TOKEN_KEY, "");

	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		if (typeof token === "string") {
			setIsLogged(true);
		} else {
			setIsLogged(false);
		}
	}, [token]);

	const html = (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<Toaster />

				{!isLogged ? (
					<div className={css.contentLogin}>{children}</div>
				) : (
					<>
						<Header />

						<div className={css.container}>
							<SideBar />
							<div className={css.content}>{children}</div>
						</div>
					</>
				)}
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
