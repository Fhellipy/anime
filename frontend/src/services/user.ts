"use client";
import { toast } from "@components/ui/toast";
import { TOKEN_KEY } from "@config/env/api";
import { useUserContext } from "@context/user";
import { User, UserLogged } from "@dto/user";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { ApiError, fetchApi } from "@lib/api";
import { useMutation } from "react-query";

type UserLogin = {
	email: string;
	password: string;
};

function useMutateUserLogin() {
	const { signIn } = useUserContext();
	const [, setToken] = useLocalStorage(TOKEN_KEY, "");

	const cookieMutation = useMutation<string, Error, string>(
		"/api",
		async (token) => {
			const response = await fetch("/api", {
				method: "POST",
				body: JSON.stringify({
					token: token,
				}),
			});

			return response.json();
		}
	);

	return useMutation<UserLogged, ApiError | Error, UserLogin>(
		"/auth/signin",
		async ({ email, password }) => {
			const response = await fetchApi("/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			return response.json();
		},
		{
			onSuccess: (data) => {
				signIn(data.user);

				const { token } = data;

				cookieMutation.mutate(token);
				setToken(token);

				toast.success("Login feito com sucesso!");

				setTimeout(() => {
					window.location.pathname = "/home";
				}, 500);
			},
			onError(error) {
				setTimeout(() => {
					toast.error(error.message);
				}, 500);
			},
		}
	);
}

function useMutateUserRegister() {
	return useMutation<User, ApiError | Error, Partial<User>>(
		"/users/register",
		async (user) => {
			const response = await fetchApi("/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			return response.json();
		},
		{
			onSuccess: () => {
				toast.success("Usuário cadastrado com sucesso! Efetue o login");
			},
			onError(error) {
				setTimeout(() => {
					toast.error(error.message);
				}, 500);
			},
		}
	);
}

export { useMutateUserLogin, useMutateUserRegister };
