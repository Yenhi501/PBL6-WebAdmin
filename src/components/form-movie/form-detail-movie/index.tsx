import './index.scss';
import React, { useState } from 'react';
import { Modal, Image, Descriptions, Button } from 'antd';
import { ItemType, TableResult } from '../../table';
import { PlusOutlined } from '@ant-design/icons';
import { FormAddEditVideoMovies } from '../form-add-edit-movie/form-add-edit-video';
import { ItemMovieHandled, ItemMovieRaw } from '../../../model/movie';
import { DefaultImg } from '../form-add-edit-movie/add-edit-image/default-img';
import { ItemDesc } from './item';
import { ColumnsType } from 'antd/es/table';
import { FormAddEpisode } from '../form-add-episode';

export const columnTableEpisode: ColumnsType<ItemType> = [
  {
    title: 'Tập',
    dataIndex: 'title',
  },
];

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
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const items = ItemDesc(selectedItem);

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={() => <></>}
      className="form-detail-movie"
      title="Chi tiết phim"
    >
      <FormAddEpisode isOpen={isOpenAdd} onCancel={() => setIsOpenAdd(false)} />
      <Image.PreviewGroup>
        <div className="form-detail-movie-image-container">
          <div className="form-detail-movie-image-item">
            <h1 className="image-title">Poster</h1>
            <Image
              width={200}
              src={selectedItem?.posterURL}
              fallback={DefaultImg}
              wrapperStyle={{ borderRadius: 15, overflow: 'hidden' }}
            />
          </div>
          <div className="form-detail-movie-image-item">
            <h1 className="image-title">Background</h1>
            <Image
              width={200}
              src={selectedItem?.backgroundURL}
              fallback={DefaultImg}
              wrapperStyle={{ borderRadius: 15, overflow: 'hidden' }}
            />
          </div>
        </div>
      </Image.PreviewGroup>
      <Modal
        open={isOpenEdit}
        onCancel={() => setIsOpenEdit(false)}
        footer={() => <></>}
        className="modal-episode"
        title="Chỉnh sửa tập "
      >
        <FormAddEditVideoMovies editItem={selectedItem} />
      </Modal>
      <Descriptions
        items={items}
        className="form-detail-movie-desc"
        column={3}
      />
      <TableResult
        key={tableKey}
        originData={selectedItem?.episodes || []}
        columns={columnTableEpisode}
        needOperationColumn={true}
        onEdit={(record) => {
          setIsOpenEdit(true);
        }}
        onAdd={() => setIsOpenAdd(true)}
      />
    </Modal>
  );
};
