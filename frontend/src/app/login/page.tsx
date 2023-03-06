"use client";
import { InputForm } from "@components/ui/InputForm";
import { TOKEN_KEY } from "@config/env/api";
import { User } from "@dto/user";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { Inter } from "@next/font/google";
import { useMutateUserLogin } from "@services/user";
import { validateEmail } from "@utils/validators/email";
import { validatePassword } from "@utils/validators/password";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function LoginPage() {
	const [token] = useLocalStorage(TOKEN_KEY, "");

	if (Object.keys(token).length) {
		redirect("/home");
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>();

	const loginMutate = useMutateUserLogin();

	const onSubmit: SubmitHandler<User> = ({ email, password }) => {
		loginMutate.mutate({ email, password });
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
