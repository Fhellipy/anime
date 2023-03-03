"use client";
import { AnimeCommentResponse, DataAnime } from "@dto/anime";
import { useMutateCommentRegister } from "@services/comments";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import css from "./styles.module.css";

type Props = {
	idAnime: string;
};

function CommentsAnime({ idAnime }: Props) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState<AnimeCommentResponse[]>();

	const commentMutate = useMutateCommentRegister();

	const commentsData = useQuery<DataAnime, Error>([
		"anime-comments",
		{ idAnime },
	]);

	const registerComment = () => {
		const data = {
			idAnime,
			comment: newComment,
		};

		commentMutate.mutate(data);
	};

	useEffect(() => {
		if (commentsData.isSuccess) {
			setComments(commentsData.data?.comments);
		}
	}, [commentsData]);

	return (
		<section className={css.comments}>
			<div className={css.newComment}>
				<label htmlFor="comment">Novo comentário: </label>
				<textarea
					name="comment"
					id="comment"
					placeholder="Digite seu comentário..."
					cols={30}
					rows={10}
					onChange={(ev) => setNewComment(ev.target.value)}
				></textarea>

				<button className={css.sendComment} onClick={registerComment}>
					Enviar
				</button>
			</div>

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
									<span className={css.author}>
										<p>{data.username}</p>
										<p>{data.createdAt.toLocaleString()}</p>
									</span>

									<span className={css.comment}>
										<p>{data.comment}</p>
									</span>
								</li>
						  ))
						: ""}

					{!comments?.length ? (
						<p className={css.noComment}>
							Esse anime ainda não possui nenhum comentário! Seja o(a)
							primeiro(a) a comentar!
						</p>
					) : (
						""
					)}
				</section>
			</ul>
		</section>
	);
}

export { CommentsAnime };
