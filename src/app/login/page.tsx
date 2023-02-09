"use client";
import { useState } from "react";
import css from "./styles.module.css";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={css.main}>
      <header>Logo</header>

      <div className={css.container}>
        <div className={css.content}>
          <span className={css.wrapper}>
            <label htmlFor="username">Usuário: </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Usuário"
              onChange={(ev) => setUserName(ev.target.value)}
            />
          </span>

          <span className={css.wrapper}>
            <label htmlFor="password">Senha: </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </span>
        </div>

        <button type="submit" className={css.buttonSignIn}>
          Login
        </button>
      </div>

      <span className={css.signUp}>
        <p>Ainda não tem uma conta?</p>
        <a>Cadastrar-se</a>
      </span>
    </main>
  );
}
