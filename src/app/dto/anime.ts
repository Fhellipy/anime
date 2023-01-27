export interface AnimeResponseDTO {
  mal_id: number;
  title: string;
  title_japanese: string;
  duration?: string | null;
  favorites?: number | null;
  year?: number | null;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  episodes: number;
  synopsis?: string | null;
}

export interface Anime {
  id: number;
  title: string;
  title_japanese: string;
  duration?: string | null;
  favorites?: number | null;
  year?: number | null;
  images: {
    large: string;
    tiny: string;
  };
  episodes: number;
  synopsis?: string | null;
}
