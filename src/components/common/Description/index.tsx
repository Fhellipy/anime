import { getAnime } from "@services/animes";
import Image from "next/image";
import css from "./styles.module.css";

interface Props {
  idAnime: string;
}

async function Description({ idAnime }: Props) {
  const anime = await getAnime(idAnime);

  if (anime) {
    return (
      <div className={css.container}>
        <div className={css.titles}>
          <h1>{anime.title}</h1>
          <h3>{anime.title_japanese}</h3>
        </div>

        <div className={css.wrapper}>
          <div>
            <Image
              src={anime.images.tiny}
              alt={anime.title}
              width={225}
              height={318}
            />
          </div>

          <div className={css.description}>
            <ul className={css.items}>
              <span>
                <li>
                  <strong>Favoritado por:</strong> {anime.favorites} pessoas
                </li>

                <li>
                  <strong>Duração:</strong> {anime.duration}
                </li>
                <li>
                  <strong>Ano:</strong> {anime.year}
                </li>
                <li>
                  <strong>{anime.episodes} </strong> episódio(s)
                </li>
              </span>

              <p className={css.synopsis}>{anime.synopsis}</p>
            </ul>
          </div>
        </div>

        <div className={css.medias}>
          {anime.trailer?.url ? (
            <iframe
              width="560"
              height="315"
              src={anime.trailer.embed_url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            ""
          )}

          <span>
            <h2>Títulos Relacionados</h2>

            {anime.title_synonyms?.map((title, index) => {
              return <p key={index}>{title}</p>;
            })}
          </span>
        </div>
      </div>
    );
  }
}

export { Description };
