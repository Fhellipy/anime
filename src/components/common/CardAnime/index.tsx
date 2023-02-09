"use client";
import { Anime } from "@dto/anime";
import { getAnime } from "@services/animes";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import css from "./styles.module.css";

interface Props {
  idAnime: string;
}

function CardAnime({ idAnime }: Props) {
  const [anime, setAnime] = useState<Anime>();

  const getAnimeInformation = useCallback(async () => {
    const response = await getAnime(idAnime);

    if (response) setAnime(response);
  }, [idAnime]);

  useEffect(() => {
    getAnimeInformation();
  }, [getAnimeInformation]);

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
                  <strong>Favoritado por:</strong>{" "}
                  {anime.favorites ? anime.favorites : "--"} pessoas
                </li>

                <li>
                  <strong>Duração:</strong>{" "}
                  {anime.duration ? anime.duration : "--"}
                </li>
                <li>
                  <strong>Ano:</strong> {anime.year ? anime.year : "--"}
                </li>
                <li>
                  <strong>{anime.episodes ? anime.episodes : "--"} </strong>{" "}
                  episódio(s)
                </li>
              </span>

              <p className={css.synopsis}>
                {anime.synopsis ? anime.synopsis : "--"}
              </p>
            </ul>
          </div>
        </div>

        <div className={css.medias}>
          {anime.trailer?.url ? (
            <iframe
              width="100%"
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

          <span className={css.synonyms}>
            {anime.title_synonyms?.length ? <h2>Títulos Relacionados</h2> : ""}

            {anime.title_synonyms?.map((title, index) => {
              return <p key={index}>{title}</p>;
            })}
          </span>
        </div>
      </div>
    );
  }

  return <></>;
}

export { CardAnime };
