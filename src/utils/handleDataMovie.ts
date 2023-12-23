import moment from 'moment';
import { DataRaw, ItemMovieHandled, ItemMovieRaw } from '../model/movie';

export const handleDataMovie = (dataRaw: DataRaw) => {
  const dataFilms: ItemMovieHandled[] = dataRaw.movies.map(
    (item: ItemMovieRaw, index: number) => {
      return {
        ...item,
        key: item.movieId,
        movieId: item.movieId.toString(),
        releaseDate: moment(item.releaseDate).format('DD-MM-YYYY'),
        level: item.level.toString(),
        isSeries: item.isSeries.toString(),
      };
    },
  );

  return dataFilms;
};
