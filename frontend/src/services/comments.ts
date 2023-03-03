"use client";
import { toast } from "@components/ui/toast";
import { AnimeComment, AnimeCommentResponse } from "@dto/anime";
import { ApiError, fetchApi } from "@lib/api";
import { useMutation } from "react-query";

function useMutateCommentRegister() {
	return useMutation<AnimeCommentResponse, ApiError | Error, AnimeComment>(
		"/anime-comments/new",
		async (data) => {
			const response = await fetchApi("/anime-comments/new", {
				method: "POST",
				body: JSON.stringify(data),
			});

			return response.json();
		},
		{
			onSuccess: () => {
				toast.success("Comentário cadastrado com sucesso!");
			},
			onError(error) {
				setTimeout(() => {
					toast.error(error.message);
				}, 500);
			},
		}
	);
}

export { useMutateCommentRegister };
