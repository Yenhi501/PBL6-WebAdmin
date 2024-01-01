export type EpisodeRaw = {
  key: string;
  episode_id: number;
  episode_no: number;
  movie_url: string;
  title: string;
};

export type GenreMovie = {
  genre_id: number;
  name: string;
};

export type DirectorMovie = {
  director_id: number;
  name: string;
};

export type ActorMovie = {
  actor_id: number;
  name: string;
};

export type ItemMovieRaw = {
  key: number;
  movieId: number;
  title: string;
  level: number;
  isSeries: boolean;
  actors: ActorMovie[];
  averageRating: number;
  backgroundURL: string;
  description: string;
  directors: DirectorMovie[];
  episodeNum: number;
  episodes: EpisodeRaw[];
  genres: GenreMovie[];
  nation: string;
  numFavorite: number;
  posterURL: string;
  releaseDate: string;
  trailerURL: string;
};

export interface ItemMovieHandled {
  key: number;
  movieId: string;
  title: string;
  level: number;
  isSeries: string;
  actors: ActorMovie[];
  averageRating: number;
  backgroundURL: string;
  description: string;
  directors: DirectorMovie[];
  episodeNum: number;
  episodes: EpisodeRaw[];
  genres: GenreMovie[];
  nation: string;
  numFavorite: number;
  posterURL: string;
  releaseDate: string;
  trailerURL: string;
}

export interface DataRaw {
  message: string;
  totalCount: number;
  totalPage: number;
  movies: ItemMovieRaw[];
}
