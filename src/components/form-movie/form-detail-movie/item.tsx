import { DescriptionsProps } from 'antd';
import { ItemMovieHandled, ItemMovieRaw } from '../../../model/movie';
import { handleSeparate } from '../../../utils/handleSaparate';

export const ItemDesc = (selectedItem: ItemMovieHandled | null) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Tên phim',
      children: selectedItem?.title,
    },
    {
      key: '2',
      label: 'Đạo diễn',
      children: selectedItem?.directors.map((director, index) => (
        <>
          {director.name}
          {handleSeparate(selectedItem?.directors, index)}
        </>
      )),
    },
    {
      key: '3',
      label: 'Diễn viên',
      children: selectedItem?.actors.map((actor, index) => (
        <>
          {actor.name}
          {handleSeparate(selectedItem?.actors, index)}
        </>
      )),
    },
    {
      key: '4',
      label: 'Quốc gia',
      children: selectedItem?.nation,
    },
    {
      key: '5',
      label: 'Thể loại',
      children: selectedItem?.genres.map((genre, index) => (
        <>
          {genre.name}
          {handleSeparate(selectedItem?.genres, index)}
        </>
      )),
    },
    {
      key: '6',
      label: 'Năm sản xuất',
      children: selectedItem?.releaseDate,
    },
    {
      key: '7',
      label: selectedItem?.isSeries === 'true' ? 'Số tập phim' : 'Số phần phim',
      children: selectedItem?.numFavorite,
    },
    {
      key: '8',
      label: 'Điểm đánh giá',
      children: selectedItem?.averageRating,
    },
    {
      key: '9',
      label: 'Số lượt thích',
      children: selectedItem?.numFavorite,
    },
  ];

  return items;
};
