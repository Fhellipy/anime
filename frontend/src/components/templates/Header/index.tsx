"use client";
import { useUserContext } from "@context/user";
import { Inter } from "@next/font/google";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

function Header() {
	const { user, signOut } = useUserContext();
	const [userName, setUserName] = useState("");

	function logout() {
		Cookies.remove("token");
		localStorage.removeItem("token");
		window.location.pathname = "/login";

		signOut();
	}

	useEffect(() => {
		if (user) setUserName(user.username);
	}, [user]);

	return (
		<header className={css.header}>
			<FaUser className={css.icon} />

			<p className={css.text}>
				Olá, <strong>{userName}</strong>
			</p>
			<button
				className={css.button}
				onClick={() => {
					logout();
				}}
			>
				Sair
			</button>
		</header>
	);
}

export { Header };
