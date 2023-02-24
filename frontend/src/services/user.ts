"use client";
import { toast } from "@components/ui/toast";
import { UserLogged } from "@dto/user";
import { ApiError, fetchApi } from "@lib/api";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

type UserLogin = {
	email: string;
	password: string;
};

function useMutateUserLogin() {
	const router = useRouter();

	const cookieMutation = useMutation(async () => {
		const response = await fetch("/api", {
			method: "POST",
		});

		return response.json();
	});

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
				cookieMutation.mutate();

				toast.success("Login feito com sucesso!");

				setTimeout(() => {
					router.push("/home");
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

export { useMutateUserLogin };
