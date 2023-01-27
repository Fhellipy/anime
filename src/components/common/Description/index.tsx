import { Anime, AnimeResponseDTO } from "@app/dto/anime";
import css from "./styles.module.css";

async function Description() {
  const animes = await getDescriptionAnime();

  return (
    <>
      <pre>{JSON.stringify(animes, null, 2)}</pre>
    </>
  );
}

export { Description };

const API_URL = process.env.NEXT_PUBLIC_API;

function isAnimeResponseDTO(
  data: unknown
): data is { data: AnimeResponseDTO[] } {
  if (!data) return false;
  if (typeof data !== "object") return false;
  return "data" in data;
}

async function getDescriptionAnime(): Promise<Anime[]> {
  const response = await fetch(`${API_URL}/top/anime/`);

  const json = await response.json();

  const result = isAnimeResponseDTO(json) ? json : { data: [] };

  return result.data.map((anime) => ({
    id: anime.mal_id,
    title: anime.title,
    title_japanese: anime.title_japanese,
    duration: anime?.duration,
    favorites: anime.favorites,
    year: anime.year,

    images: {
      large: anime.images.webp.large_image_url,
      tiny: anime.images.webp.image_url,
    },
    episodes: anime.episodes,
    synopsis: anime.synopsis,
  }));
}
