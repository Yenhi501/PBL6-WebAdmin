import { Modal, Spin, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';

import './index.scss';
import { FormAddEditInfoFilm } from './add-edit-info';
import { FormAddEditImageMovies } from './add-edit-image';
import { FormAddEditVideoMovies } from './form-add-edit-video';
import axios from 'axios';
import { ItemMovieHandled } from '../../../model/movie';
import { endpointServer } from '../../../utils/endpoint';
import { useToken } from '../../../hooks/useToken';

export interface UrlPost {
  key: string;
  value: string;
}

export type FormAddEditMovie = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props: any) => void;
  editItem?: ItemMovieHandled | null;
  refreshData?: (props?: any) => void;
};

export const FormAddEditMovie = ({
  isOpen,
  editItem = null,
  handleCancel,
  isEditForm = false,
  refreshData = () => {},
}: FormAddEditMovie) => {
  const [urlPostImageList, setUrlPostImageList] = useState<UrlPost[]>([
    { key: '', value: '' },
  ]);
  const [urlPostVideo, setUrlPostVideo] = useState<UrlPost>({
    key: '',
    value: '',
  });
  const { accessToken } = useToken();

  const [activeKey, setActiveKey] = useState('1');

  const getUrlPostList = () => {
    axios
      .get(
        `${endpointServer}/movies/get/presign-url?movieId=${editItem?.movieId}&option=all`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response: any) => {
        setUrlPostImageList([response.data[0], response.data[1]]);
        setUrlPostVideo(response.data[2]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setActiveKey('1');
  }, [isOpen]);

  useEffect(() => {
    if (
      isOpen === true &&
      isEditForm === true &&
      (activeKey === '2' || activeKey === '3')
    ) {
      getUrlPostList();
    }
  }, [activeKey]);

  const FormAddEditInfoFilmCustom = () => (
    <FormAddEditInfoFilm
      editItem={editItem}
      isEditForm={isEditForm}
      onClose={handleCancel}
      refreshData={refreshData}
    />
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông tin',
      children: <FormAddEditInfoFilmCustom />,
    },
    {
      key: '2',
      label: 'Ảnh',
      children: (
        <FormAddEditImageMovies
          urlPostList={urlPostImageList}
          editItem={editItem}
          onClose={handleCancel}
        />
      ),
    },
    {
      key: '3',
      label: 'Phim giới thiệu',
      children: (
        <FormAddEditVideoMovies
          urlPostVideo={urlPostVideo}
          editItem={editItem}
          onClose={handleCancel}
        />
      ),
    },
  ];

  return (
    <Modal
      title={isEditForm === true ? 'Chỉnh sửa phim' : 'Thêm phim'}
      open={isOpen}
      onCancel={handleCancel}
      footer={() => <></>}
      className="modal-add-edit-film"
    >
      <Tabs
        defaultActiveKey={activeKey}
        items={isEditForm === true ? items : [items[0]]}
        activeKey={activeKey}
        onTabClick={(activeKey) => setActiveKey(activeKey)}
      />
    </Modal>
  );
};
