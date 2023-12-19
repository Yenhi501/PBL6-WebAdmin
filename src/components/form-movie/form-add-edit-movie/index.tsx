import { Modal, SelectProps, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import './index.scss';
import moment from 'moment';
import { FormAddEditInfoFilm } from './add-edit-info';
import { FormAddEditImageMovies } from './add-edit-image';
import { FormAddEditVideoMovies } from './form-add-edit-video';
import axios from 'axios';
import { ItemMovieHandled, ItemMovieRaw } from '../../../model/movie';
export interface UrlPost {
  key: string;
  value: string;
}

export type FormAddEditMovie = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props: any) => void;
  editItem?: ItemMovieHandled | null;
};

export const FormAddEditMovie = ({
  isOpen,
  editItem = null,
  handleCancel,
  isEditForm = false,
}: FormAddEditMovie) => {
  const [urlPostImageList, setUrlPostImageList] = useState<UrlPost[]>([
    { key: '', value: '' },
  ]);
  const [urlPostVideo, setUrlPostVideo] = useState<UrlPost>({
    key: '',
    value: '',
  });

  const [activeKey, setActiveKey] = useState('1');

  const getUrlPostList = () => {
    axios
      .get(
        'http://localhost:8000/api/movies/get/presign-url?movieId=1&option=all',
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `token ${/*${token}*/ ''}`,
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

    if (
      isOpen === true &&
      isEditForm === true &&
      (activeKey === '2' || activeKey === '3')
    ) {
      getUrlPostList();
    }
  }, [isOpen]);

  const FormAddEditInfoFilmCustom = () => (
    <FormAddEditInfoFilm
      editItem={editItem}
      isEditForm={isEditForm}
      onClose={handleCancel}
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
        />
      ),
    },
    {
      key: '3',
      label: 'Phim giới thiệu',
      children: <FormAddEditVideoMovies urlPostVideo={urlPostVideo} />,
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
      {isEditForm === true ? (
        <Tabs
          defaultActiveKey={activeKey}
          items={items}
          activeKey={activeKey}
          onTabClick={(activeKey) => setActiveKey(activeKey)}
        />
      ) : (
        <FormAddEditInfoFilmCustom />
      )}
    </Modal>
  );
};
