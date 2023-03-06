"use client";
import { useUserContext } from "@context/user";
import { AnimeCommentResponse, DataAnime } from "@dto/anime";
import { useMutateCommentDelete } from "@services/comments";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useQuery } from "react-query";
import css from "./styles.module.css";

type Props = {
	idAnime: string;
};

function CommentsAnime({ idAnime }: Props) {
	const { user } = useUserContext();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [comments, setComments] = useState<AnimeCommentResponse[]>([]);

	const commentMutate = useMutateCommentDelete();

	const commentsData = useQuery<DataAnime, Error>([
		"anime-comments",
		{ idAnime },
	]);

	useEffect(() => {
		if (commentsData.isSuccess) {
			setComments(commentsData.data?.comments);
		}
	}, [commentsData]);

	return (
		<ul className={css.existingComments}>
			<span className={css.headerSession}>
				<label>Comentários </label>

				<button
					className={css.openSession}
					onClick={() => setIsCollapsed((state) => !state)}
				>
					{isCollapsed ? <FiChevronUp /> : <FiChevronDown />}
				</button>
			</span>

			<section
				className={`${css.sessionComments} ${
					isCollapsed ? css.expanded : css.collapsed
				}`}
				aria-expanded={isCollapsed}
			>
				{comments?.length
					? comments.map((data) => (
							<li key={data.id}>
								<span className={css.header}>
									<span className={css.author}>
										<p>{data.username}</p>
										<p>{new Date(data.createdAt).toLocaleString()}</p>
									</span>

									{user?.id === data.userId ? (
										<button
											title="Deletar comentário"
											className={css.deleteComment}
											onClick={() => {
												const id = data.id;
												commentMutate.mutate({ id });
											}}
										>
											<AiOutlineCloseCircle className={css.iconError} />
										</button>
									) : (
										""
									)}
								</span>

								<span className={css.comment}>
									<p>{data.comment}</p>
								</span>
							</li>
					  ))
					: ""}

				{!comments?.length ? (
					<p className={css.noComment}>
						Esse anime ainda não possui nenhum comentário! Seja o(a) primeiro(a)
						a comentar!
					</p>
				) : (
					""
				)}
			</section>
		</ul>
	);
}

export { CommentsAnime };
