import { Inter } from "@next/font/google";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

export default async function Configuration() {
	return (
		<main>
			<h1>Configuração</h1>
		</main>
	);
}
