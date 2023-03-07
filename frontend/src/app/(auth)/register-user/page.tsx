"use client";
import { InputForm } from "@components/ui/InputForm";
import { TOKEN_KEY } from "@config/env/api";
import { User } from "@dto/user";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { Inter } from "@next/font/google";
import { useMutateUserRegister } from "@services/user";
import { validateConfirmPassword } from "@utils/validators/confirmPassword";
import { validateEmail } from "@utils/validators/email";
import { validatePassword } from "@utils/validators/password";
import { validateUsername } from "@utils/validators/username";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function RegisterUserPage() {
	const [token] = useLocalStorage(TOKEN_KEY, "");

	const registerMutate = useMutateUserRegister();

	if (Object.keys(token).length) {
		redirect("/home");
	}

	const {
		register,
		handleSubmit,
		setError,
		reset,
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

		const { confirm_password: _, ...user } = data;

		registerMutate.mutate(user);
	};

	useEffect(() => {
		if (registerMutate.isSuccess) reset();
	}, [registerMutate.isSuccess]);

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
						label="Confirmar senha"
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
