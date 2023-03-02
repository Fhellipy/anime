import css from "./styles.module.css";

type Props = {
	idAnime: string;
};

function CommentsAnime({ idAnime }: Props) {
	return (
		<section className={css.comments}>
			<div className={css.newComment}>
				<label htmlFor="comment">Novo comentário: </label>
				<textarea name="comment" id="comment" cols={30} rows={10}></textarea>
			</div>

			<ul className={css.existingComments}>
				<li>
					<span className={css.author}>
						<p>Fhellipy</p>
						<p>|</p>
						<p>02/03/2023</p>
					</span>

					<span className={css.comment}>
						<p>Comentário</p>
					</span>
				</li>
			</ul>
		</section>
	);
}

export { CommentsAnime };
