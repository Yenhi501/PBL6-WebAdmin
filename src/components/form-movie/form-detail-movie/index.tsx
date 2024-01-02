import './index.scss';
import React, { useEffect, useState } from 'react';
import { Modal, Image, Descriptions, Button, Spin } from 'antd';
import { ItemType, TableResult } from '../../table';
import { PlusOutlined } from '@ant-design/icons';
import { FormAddEditVideoMovies } from '../form-add-edit-movie/form-add-edit-video';
import {
  EpisodeRaw,
  ItemMovieHandled,
  ItemMovieRaw,
  defaultEpisodeRaw,
  defaultItemMovieRaw,
} from '../../../model/movie';
import { DefaultImg } from '../form-add-edit-movie/add-edit-image/default-img';
import { ItemDesc } from './item';
import { ColumnsType } from 'antd/es/table';
import { FormAddEpisode } from '../form-add-episode';
import axios from 'axios';
import { endpointServer } from '../../../utils/endpoint';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { DescriptionsItemType } from 'antd/es/descriptions';
import dayjs from 'dayjs';
import { FormAddEditEpisode } from './form-add-edit-episode';

export const columnTableEpisode: ColumnsType<ItemType> = [
  {
    title: 'Tập',
    dataIndex: 'title',
  },
  {
    title: 'Ngày ra mắt',
    dataIndex: 'release_date',
    render: (date) => {
      return <>{dayjs(date).format('DD/MM/YYYY')}</>;
    },
  },
];
export const DetailMovieContext = React.createContext({
  isOpen: false,
  movieId: 0,
});

export type FormDetailMovie = {
  onCancel?: (props?: any) => void;
  isOpen: boolean;
  selectedItem: ItemMovieHandled | null;
};

export const FormDetailMovie = ({
  isOpen,
  onCancel,
  selectedItem = null,
}: FormDetailMovie) => {
  const [tableKey, setTableKey] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailInfo, setDetailInfo] =
    useState<ItemMovieRaw>(defaultItemMovieRaw);
  const [itemInfoDetail, setItemInfoDetail] =
    useState<DescriptionsItemType[]>();

  const [editItem, setEditItem] = useState<EpisodeRaw>(defaultEpisodeRaw);

  const [refreshTable, setRefreshTable] = useState(0);

  const getDataDetailFilm = () => {
    setIsLoading(true);
    axios
      .get(`${endpointServer}/movies/${selectedItem?.movieId}`)
      .then((res) => {
        setIsLoading(false);
        setDetailInfo(res.data.movie);
        console.log(res.data.movie.episodes);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getDataDetailFilm();
  }, [selectedItem, refreshTable]);

  useEffect(() => {
    setItemInfoDetail(ItemDesc(detailInfo));
  }, [detailInfo]);

  return (
    <DetailMovieContext.Provider
      value={{ isOpen: isOpenModal, movieId: detailInfo.movieId }}
    >
      <Modal
        open={isOpen}
        onCancel={onCancel}
        footer={() => <></>}
        className="form-detail-movie"
        title="Chi tiết phim"
      >
        <FormAddEditEpisode
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          editItem={editItem}
          isEditForm={editItem.episode_id === 0 ? false : true}
          movieId={detailInfo.movieId}
          setRefreshTable={setRefreshTable}
        />
        <Spin
          indicator={<LoadingOutlined rev={''} style={{ fontSize: 24 }} spin />}
          spinning={isLoading}
        >
          <Image.PreviewGroup>
            <div className="form-detail-movie-image-container">
              <div className="form-detail-movie-image-item">
                <h1 className="image-title">Poster</h1>
                <Image
                  width={200}
                  height={300}
                  src={detailInfo?.posterURL}
                  fallback={DefaultImg}
                  wrapperStyle={{ borderRadius: 15, overflow: 'hidden' }}
                  className="form-detail-movie-image"
                />
              </div>
              <div className="form-detail-movie-image-item">
                <h1 className="image-title">Background</h1>
                <Image
                  width={300}
                  height={150}
                  src={detailInfo?.backgroundURL}
                  fallback={DefaultImg}
                  wrapperStyle={{ borderRadius: 15, overflow: 'hidden' }}
                  className="form-detail-movie-background"
                />
              </div>
            </div>
          </Image.PreviewGroup>

          <Descriptions
            items={itemInfoDetail}
            className="form-detail-movie-desc"
            column={3}
          />
          <Button
            className="refresh-btn"
            icon={<ReloadOutlined rev="" />}
            onClick={() => setRefreshTable((prev) => prev + 1)}
          >
            Làm mới
          </Button>
          <TableResult
            key={tableKey}
            originData={detailInfo?.episodes || []}
            columns={columnTableEpisode}
            needOperationColumn={true}
            onEdit={(record) => {
              setIsOpenModal(true);
              setEditItem(record as EpisodeRaw);
            }}
            onAdd={() => setIsOpenModal(true)}
          />
        </Spin>
      </Modal>
    </DetailMovieContext.Provider>
  );
};
