"use client";
import { toast } from "@components/ui/toast";
import { queryClient } from "@config/queryClient";
import { AnimeComment, AnimeCommentResponse } from "@dto/anime";
import { ApiError, fetchApi } from "@lib/api";
import { useMutation } from "react-query";

type Anime = {
	id: string;
};

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
				queryClient.invalidateQueries("anime-comments");
			},
			onError(error) {
				setTimeout(() => {
					toast.error(error.message);
				}, 500);
			},
		}
	);
}

function useMutateCommentDelete() {
	return useMutation<Anime, ApiError | Error, Anime>(
		"/anime-comments",
		async ({ id }) => {
			const response = await fetchApi(`/anime-comments`, {
				method: "DELETE",
				body: JSON.stringify({ id }),
			});

			return response.json();
		},
		{
			onSuccess: () => {
				toast.success("Comentário deletado com sucesso!");
				queryClient.invalidateQueries("anime-comments");
			},
			onError(error) {
				setTimeout(() => {
					toast.error(error.message);
				}, 500);
			},
		}
	);
}

export { useMutateCommentRegister, useMutateCommentDelete };
