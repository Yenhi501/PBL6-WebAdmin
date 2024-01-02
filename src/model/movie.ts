export type EpisodeRaw = {
  key: string;
  episode_id: number;
  episode_no: number;
  movie_url: string;
  title: string;
  release_date: string;
};

export const defaultEpisodeRaw: EpisodeRaw = {
  key: '',
  episode_id: 0,
  episode_no: 0,
  movie_url: '',
  title: '',
  release_date: '',
};

export type GenreMovie = {
  genre_id: number;
  name: string;
};

export const defaultGenreMovie: GenreMovie = {
  genre_id: 0,
  name: '',
};

export type DirectorMovie = {
  director_id: number;
  name: string;
};

export const defaultDirectorMovie: DirectorMovie = {
  director_id: 0,
  name: '',
};

export type ActorMovie = {
  actor_id: number;
  name: string;
};

export const defaultActorMovie: ActorMovie = {
  actor_id: 0,
  name: '',
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

export const defaultItemMovieRaw: ItemMovieRaw = {
  key: 0,
  movieId: 0,
  title: '',
  level: 0,
  isSeries: false,
  actors: [defaultActorMovie],
  averageRating: 0,
  backgroundURL: '',
  description: '',
  directors: [defaultDirectorMovie],
  episodeNum: 0,
  episodes: [defaultEpisodeRaw],
  genres: [defaultGenreMovie],
  nation: '',
  numFavorite: 0,
  posterURL: '',
  releaseDate: '',
  trailerURL: '',
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
