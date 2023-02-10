"use client";
import { useState } from "react";
import css from "./styles.module.css";
import { Inter } from "@next/font/google";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "@dto/user";
import { InputForm } from "@components/ui/InputForm";
import { validatePassword } from "./validators/password";
import { validateUsername } from "./validators/username";

const inter = Inter({ subsets: ["latin"] });

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log("data", data);
  };

  return (
    <main className={css.main}>
      <header>Logo</header>

      <form className={css.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.content}>
          <InputForm
            error={errors.username?.message}
            validator={register("username", validateUsername)}
            placeholder="Usuário"
            label="Usuário"
            type="text"
          />

          <InputForm
            error={errors.password?.message}
            validator={register("password", validatePassword)}
            placeholder="*********"
            label="Senha"
            type="password"
          />
        </div>

        <button type="submit" className={css.buttonSignIn}>
          Login
        </button>
      </form>

      <span className={css.signUp}>
        <p>Ainda não tem uma conta?</p>
        <a href="/cadastrar">Cadastrar-se</a>
      </span>
    </main>
  );
}
