import { Header } from "@components/templates/Header";
import SideBar from "@components/templates/SideBar";
import { Inter } from "@next/font/google";
import "../styles/globals.css";
import css from "./styles.module.css";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}

const getAuthStatus = () => {
  const nextCookies = cookies(); // Get cookies object
  const cookie = nextCookies.get("is-logged-in"); // Find cookie

  const isLoggedIn = cookie?.value === "true";

  return {
    isLoggedIn,
  };
};

export default function RootLayout({ children }: Props) {
  const { isLoggedIn } = getAuthStatus();

  return (
    <html lang="pt-BR">
      <head />
      <body className={css.body}>
        {isLoggedIn ? (
          <>
            <Header />

            <div className={css.container}>
              <SideBar />
              <div className={css.content}>{children}</div>
            </div>
          </>
        ) : (
          <div className={css.content}>{children}</div>
        )}
      </body>
    </html>
  );
}
