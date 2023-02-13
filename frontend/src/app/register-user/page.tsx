"use client";
import { validateConfirmPassword } from "@app/login/validators/confirmPassword";
import { validateEmail } from "@app/login/validators/email";
import { validatePassword } from "@app/login/validators/password";
import { validateUsername } from "@app/login/validators/username";
import { InputForm } from "@components/ui/InputForm";
import { User } from "@dto/user";
import { Inter } from "@next/font/google";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function RegisterUserPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    if (data.password !== data.confirm_password) {
      setError("password", {
        type: "custom",
        message: "Senha e confirmar senha não correspondem!",
      });
      setError("confirm_password", {
        type: "custom",
        message: "Senha e confirmar senha não correspondem!",
      });

      return;
    }

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
            label="Usuário"
            placeholder="Digite o usuário..."
            type="text"
          />

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

          <InputForm
            error={errors.confirm_password?.message}
            validator={register("confirm_password", validateConfirmPassword)}
            placeholder="*********"
            label="Senha"
            type="password"
            confirmPass
          />
        </div>

        <button type="submit" className={css.buttonSignIn}>
          Cadastrar
        </button>
      </form>

      <span className={css.signUp}>
        <p>Já tem uma conta?</p>
        <a href="/login">Faça login</a>
      </span>
    </main>
  );
}
