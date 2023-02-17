'use client';
import { InputForm } from '@components/ui/InputForm';
import { toast } from '@components/ui/toast';
import { User } from '@dto/user';
import { fetchApi } from '@lib/api';
import { Inter } from '@next/font/google';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import css from './styles.module.css';
import { validateEmail } from './validators/email';
import { validatePassword } from './validators/password';

const inter = Inter({ subsets: ['latin'] });

type UserLogin = {
	email: string;
	password: string;
};

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>();

	const loginMutate = useMutation<User, Error, UserLogin>(
		'/auth/signin',
		async ({ email, password }) => {
			const response = await fetchApi('/auth/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			return response.json();
		},
		{
			onSuccess() {
				toast.success('Login feito com sucesso!');
			},
			onError(error) {
				toast.error(error.message);
			},
		}
	);

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
						validator={register('email', validateEmail)}
						label="Email"
						placeholder="email@gmail.com"
						type="email"
					/>

					<InputForm
						error={errors.password?.message}
						validator={register('password', validatePassword)}
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
