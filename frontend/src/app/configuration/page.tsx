"use client";
import { InputForm } from "@components/ui/InputForm";
import { Inter } from "@next/font/google";
import { validateConfirmPassword } from "@utils/validators/confirmPassword";
import { validateCurrentPassword } from "@utils/validators/currentPassword";
import { validatePassword } from "@utils/validators/password";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

type TypePassword = {
	current_password: string;
	password: string;
	confirm_password: string;
};

export default function Configuration() {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm<TypePassword>();

	const onSubmit: SubmitHandler<TypePassword> = (data) => {
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


		// registerMutate.mutate(user);
	};

	return (
		<main className={css.main}>
			<h1>Configuração</h1>

			<form className={css.container} onSubmit={handleSubmit(onSubmit)}>
				<div className={css.content}>
					<InputForm
						error={errors.current_password?.message}
						validator={register("current_password", validateCurrentPassword)}
						placeholder="*********"
						label="Senha atual"
						type="password"
						currentPass
					/>

					<InputForm
						error={errors.password?.message}
						validator={register("password", validatePassword)}
						placeholder="*********"
						label="Nova senha"
						type="password"
					/>

					<InputForm
						error={errors.confirm_password?.message}
						validator={register("confirm_password", validateConfirmPassword)}
						placeholder="*********"
						label="Confirmar nova senha"
						type="password"
						confirmPass
					/>
				</div>

				<button type="submit" className={css.buttonResetPassword}>
					Redefinir
				</button>
			</form>
		</main>
	);
}
