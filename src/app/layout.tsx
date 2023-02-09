import { Header } from "@components/templates/Header";
import SideBar from "@components/templates/SideBar";
import { Inter } from "@next/font/google";
import "../styles/globals.css";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR">
      <head />
      <body className={css.body}>
        <Header />

        <div className={css.container}>
          <SideBar />
          <div className={css.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
