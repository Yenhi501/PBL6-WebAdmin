import { ColumnsType } from 'antd/es/table';
import { ActorMovie, DirectorMovie, GenreMovie } from '../../model/movie';
import { handleSeparate } from '../../utils/handleSaparate';
import { ItemType } from '../../components/table';

const levelMap: Record<string, string> = {
  '1': 'Tiêu chuẩn',
  '2': 'Cao cấp',
  '3': 'Đặc biệt',
};

const typeMovieMap: Record<string, string> = {
  true: 'Phim bộ',
  false: 'Phim lẻ',
};
export const columnsMovieTable: ColumnsType<ItemType> = [
  { title: 'STT', dataIndex: 'key', render: (value) => <>{value + 1}</> },
  {
    title: 'Tên phim',
    dataIndex: 'title',
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
