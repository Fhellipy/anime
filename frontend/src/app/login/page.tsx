"use client";
import { InputForm } from "@components/ui/InputForm";
import { User } from "@dto/user";
import { Inter } from "@next/font/google";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./styles.module.css";
import { validateEmail } from "./validators/email";
import { validatePassword } from "./validators/password";

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
            error={errors.email?.message}
            validator={register("email", validateEmail)}
            label="Email"
            placeholder="email@gmail.com"
            type="email"
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
        <a href="/register-user">Cadastrar-se</a>
      </span>
    </main>
  );
}
