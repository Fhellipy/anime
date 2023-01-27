import Aside from "@components/templates/Aside";
import { Header } from "@components/templates/Header";
import "../styles/globals.css";
import css from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />

      <body className={css.body}>
        <Header className={css.header} />
        <Aside />

        <div className={css.container}>{children}</div>
      </body>
    </html>
  );
}
