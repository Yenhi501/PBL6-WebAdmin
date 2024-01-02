import { Modal, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormAddEditVideoMovies } from '../../form-add-edit-movie/form-add-edit-video';
import { FormAddEpisode } from '../../form-add-episode';
import { EpisodeRaw, defaultEpisodeRaw } from '../../../../model/movie';
import axios from 'axios';
import { endpointServer } from '../../../../utils/endpoint';
import { useToken } from '../../../../hooks/useToken';

export type FormAddEditEpisode = {
  isEditForm?: boolean;
  editItem?: EpisodeRaw;
  isOpen?: boolean;
  onClose?: (props?: any) => void;
  movieId?: number | string;
  setRefreshTable?: (props?: any) => void;
};
export const FormAddEditEpisode = ({
  isEditForm,
  editItem = defaultEpisodeRaw,
  isOpen,
  onClose = () => {},
  movieId,
  setRefreshTable = () => {},
}: FormAddEditEpisode) => {
  const [activeKey, setActiveKey] = useState('1');
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông tin',
      children: (
        <FormAddEpisode
          onCancel={onClose}
          movieId={movieId}
          setRefreshTable={setRefreshTable}
          isEditForm={isEditForm}
          editItem={editItem}
        />
      ),
    },
    {
      key: '2',
      label: 'Video',
      children: (
        <FormAddEditVideoMovies
          episodeItem={editItem}
          onClose={onClose}
          type="episode"
        />
      ),
    },
  ];

  useEffect(() => {
    setActiveKey('1');
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={() => <></>}
      className="modal-episode"
      title={isEditForm === true ? 'Chỉnh sửa tập ' : 'Thêm thông tin tập'}
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
