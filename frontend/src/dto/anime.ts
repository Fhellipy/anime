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
	title_synonyms?: string[];
	trailer?: {
		youtube_id: string;
		url: string;
		embed_url: string;
	};
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
	title_synonyms?: string[];
	trailer?: {
		youtube_id: string;
		url: string;
		embed_url: string;
	};
}

export interface AnimeComment {
	idAnime: string;
	comment?: string;
}

export interface AnimeCommentResponse {
	id: string;
	idAnime: string;
	comment: string;
	username: string;
	userId: string;
	createdAt: Date;
}

export interface DataAnime {
	comments: AnimeCommentResponse[];
}
