import { ColumnsType } from 'antd/es/table';
import {
  ActorMovie,
  DirectorMovie,
  GenreMovie,
  ItemMovieHandled,
} from '../../model/movie';
import { handleSeparate } from '../../utils/handleSaparate';
import { ItemType } from '../../components/table';
import { ColumnFilterItem, FilterValue, Key } from 'antd/es/table/interface';

const levelMap: Record<string, string> = {
  '1': 'Tiêu chuẩn',
  '2': 'Cao cấp',
  '3': 'Đặc biệt',
};

const typeMovieMap: Record<string, string> = {
  true: 'Phim bộ',
  false: 'Phim lẻ',
};
export const columnsMovieTable = (
  filterInfo: Record<string, FilterValue | null>,
  genres?: GenreMovie[],
) => {
  const columns: ColumnsType<ItemType> = [
    {
      title: 'ID',
      dataIndex: 'movieId',
      render: (value) => <>{value}</>,
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        const aTemp = a as ItemMovieHandled;
        const bTemp = b as ItemMovieHandled;
        return Number(aTemp.movieId) - Number(bTemp.movieId);
      },
    },
    {
      title: 'Tên phim',
      dataIndex: 'title',
      sorter: (a, b) => {
        const aTemp = a as ItemMovieHandled;
        const bTemp = b as ItemMovieHandled;
        return aTemp.title.localeCompare(bTemp.title);
      },
    },
    {
      title: 'Đạo diễn',
      dataIndex: 'directors',
      render: (directorList: DirectorMovie[]) =>
        directorList.map((director, index) => (
          <>
            {director.name}
            {handleSeparate(directorList, index)}
          </>
        )),
      sorter: (a, b) => {
        const aTemp = a as ItemMovieHandled;
        const bTemp = b as ItemMovieHandled;
        return aTemp.title.localeCompare(bTemp.title);
      },
    },
    {
      title: 'Diễn viên',
      dataIndex: 'actors',
      render: (actorList: ActorMovie[]) =>
        actorList.map((actor, index) => (
          <>
            {actor.name}
            {handleSeparate(actorList, index)}
          </>
        )),
      sorter: (a, b) => {
        const aTemp = a as ItemMovieHandled;
        const bTemp = b as ItemMovieHandled;
        return aTemp.title.localeCompare(bTemp.title);
      },
    },
    {
      title: 'Quốc gia',
      dataIndex: 'nation',
    },
    {
      title: 'Thể loại',
      dataIndex: 'genres',
      render: (genreList: GenreMovie[]) =>
        genreList.map((genre, index) => (
          <>
            {genre.name}
            {handleSeparate(genreList, index)}
          </>
        )),
      filters: genres?.map((genre) => {
        return { text: genre.name, value: genre.genre_id };
      }),
      filteredValue: filterInfo.genres || null,
      onFilter: (value, record) => {
        const recordTemp = record as ItemMovieHandled;
        return recordTemp.genres.some((genre) =>
          genres != null
            ? genre.genre_id === genres[(value as number) - 1].genre_id
            : false,
        );
      },
      ellipsis: true,
    },
    {
      title: 'Năm sản xuất',
      dataIndex: 'releaseDate',
    },
    {
      title: 'Cấp độ',
      dataIndex: 'level',
      render: (level: string) => <>{levelMap[level]}</>,
    },
    {
      title: 'Loại phim',
      dataIndex: 'isSeries',
      render: (isSeries: string) => <>{typeMovieMap[isSeries]}</>,
    },
  ];
  return columns;
};
