"use client";
import { useMutateCommentRegister } from "@services/comments";
import { validateComment } from "@utils/validators/comment";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CommentsAnime } from "../Comments";
import css from "./styles.module.css";

type Props = {
	idAnime: string;
};

type CommentAnime = {
	comment: string;
};

function NewComment({ idAnime }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CommentAnime>();

	const commentMutate = useMutateCommentRegister();

	const onSubmit: SubmitHandler<CommentAnime> = ({ comment }) => {
		const data = {
			idAnime,
			comment,
		};

		commentMutate.mutate(data);
	};

	useEffect(() => {
		if (commentMutate.isSuccess) {
			reset();
		}
	}, [commentMutate.isSuccess]);

	return (
		<section className={css.comments}>
			<form className={css.content} onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="comment">Novo comentário: </label>

				<span className={css.newComment}>
					<textarea
						id="comment"
						placeholder="Digite seu comentário..."
						cols={30}
						rows={10}
						{...register("comment", validateComment)}
					></textarea>
					<p role="alert">{errors.comment?.message}</p>
				</span>

				<button type="submit" className={css.sendComment}>
					Enviar
				</button>
			</form>

			<CommentsAnime idAnime={idAnime} />
		</section>
	);
}

export { NewComment };
