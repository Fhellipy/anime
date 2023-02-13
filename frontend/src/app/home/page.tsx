import { Inter } from "@next/font/google";
import { getTopAnimes } from "@services/animes";
import Image from "next/image";
import Link from "next/link";
import css from "./styles.module.css";

const inter = Inter({ subsets: ["latin"] });

export default async function HomePage() {
  const animes = await getTopAnimes();

  const formatTitle = (title: string) => {
    if (title.length >= 15) {
      return title.substr(0, 15) + "...";
    } else {
      return title;
    }
  };

  return (
    <main className={css.container}>
      <h1>Top Animes</h1>
      <div className={css.content}>
        {animes.map((anime) => (
          <Link
            href={`/anime/${anime.id}`}
            className={css.wrapper}
            key={anime.id}
          >
            <Image
              src={anime.images.tiny}
              alt={anime.title}
              width={225}
              height={318}
            />

            <ul className={css.titles}>
              <li>{formatTitle(anime.title)}</li>
              <li>{formatTitle(anime.title_japanese)}</li>
            </ul>
          </Link>
        ))}
      </div>
    </main>
  );
}
