import './index.scss';
import React, { useState } from 'react';
import {
  Form,
  Modal,
  Image,
  DescriptionsProps,
  Descriptions,
  Button,
} from 'antd';
import { TableResult } from '../../table';
import { PlusOutlined } from '@ant-design/icons';
import { columnTableEpisode } from './columns-table-episode';
import { Episode } from '../../../model/episode';
import { FormAddEditVideoMovies } from '../form-add-edit-movie/form-add-edit-video';

export type FormDetailMovie = {
  idMovie: string;
  onCancel?: (props: any) => void;
  isOpen: boolean;
};

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Tên phim',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Đạo diễn',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Diễn viên',
    children: 'empty',
  },
  {
    key: '4',
    label: 'Quốc gia',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '5',
    label: 'Thể loại',
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
  {
    key: '6',
    label: 'Năm sản xuất',
    children: 'empty',
  },
];

const data: Array<Episode> = [
  {
    key: '1',
    episode: 'Tập 1',
    duration: '80 phút',
  },
  {
    key: '2',
    episode: 'Tập 1',
    duration: '80 phút',
  },
  {
    key: '3',
    episode: 'Tập 1',
    duration: '80 phút',
  },
];

export const FormDetailMovie = ({
  idMovie,
  isOpen,
  onCancel,
}: FormDetailMovie) => {
  const [tableKey, setTableKey] = useState('');
  const [isOpenAddEdit, setIsOpenAddEdit] = useState(false);

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={() => <></>}
      className="form-detail-movie"
    >
      <Image.PreviewGroup>
        <div className="form-detail-movie-image-container">
          <div className="form-detail-movie-image-item">
            <h1 className="image-title">Poster</h1>
            <Image
              width={200}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
          </div>
          <div className="form-detail-movie-image-item">
            <h1 className="image-title">Background</h1>
            <Image
              width={200}
              src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            />
          </div>
        </div>
      </Image.PreviewGroup>
      <Modal
        open={isOpenAddEdit}
        onCancel={() => setIsOpenAddEdit(false)}
        footer={() => <></>}
        className="modal-episode"
      >
        <FormAddEditVideoMovies />
      </Modal>
      <Descriptions
        layout="vertical"
        items={items}
        className="form-detail-movie-desc"
      />
      <Button
        type="primary"
        size="large"
        className="btn-new"
        onClick={() => {}}
        icon={<PlusOutlined rev="" />}
      >
        New Item
      </Button>
      <TableResult
        key={tableKey}
        originData={data}
        columns={columnTableEpisode}
        needOperationColumn={true}
        onEdit={(record) => {
          setIsOpenAddEdit(true);
        }}
      />
    </Modal>
  );
};
