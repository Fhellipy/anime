"use client";
import { Header } from "@components/templates/Header";
import SideBar from "@components/templates/SideBar";
import { TOKEN_KEY } from "@config/env/api";
import { queryClient } from "@config/queryClient";
import { Inter } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "react-query";
import { useLocalStorage } from "src/hooks/useLocalStorage";
import "../styles/globals.css";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	const [token, _] = useLocalStorage(TOKEN_KEY, "");

	const html = (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<Toaster />
				{token ? (
					<>
						<Header />

						<div className={css.container}>
							<SideBar />
							<div className={css.content}>{children}</div>
						</div>
					</>
				) : (
					<div className={css.contentLogin}>{children}</div>
				)}
			</QueryClientProvider>
		</SessionProvider>
	);

	return (
		<html lang="pt-BR">
			<head />
			<body className={css.body}>{html}</body>
		</html>
	);
}
