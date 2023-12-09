import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import statusCards from '../../assets/JsonData/status-card-data.json';
import { Search } from '../../components/search/index';
import { StatusCard } from '../../components/status-card/index';
import { ItemType, TableResult } from '../../components/table/index';

import { PosterUpload } from '../../components/upload-poster';
import './index.scss';
import { FormDetailMovie } from '../../components/form-movie';
import { FormAddEditMovie } from '../../components/form-movie/form-add-edit-movie';
import { useDispatch } from 'react-redux';
import { SetIsEditMovies } from '../../redux/actions/movie-action';
import moment from 'moment';

export interface ItemMovies {
  key: number;
  id: string;
  nameMovies: string;
  director: string;
  country: string;
  category: string[];
  year: string;
  actor: string[];
  desc: string;
}

const dataOrigin: Array<ItemMovies> = [
  {
    key: 1,
    id: 's1',
    nameMovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: ['Tình cảm'],
    year: moment('2020-06-09T12:40:14+0000').calendar(),
    actor: ['sđssd'],
    desc: '',
  },
  {
    key: 14,
    id: '2',
    nameMovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: ['Tình cảm'],
    year: moment('2020-06-09T12:40:14+0000').calendar(),
    actor: ['sđssd'],
    desc: '',
  },
  {
    key: 3,
    id: '3',
    nameMovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: ['Tình cảm'],
    year: moment('2020-06-09T12:40:14+0000').calendar(),
    actor: ['sđssd'],
    desc: '',
  },
];

const columns = [
  {
    title: 'Name Movies',
    dataIndex: 'nameMovies',
  },
  {
    title: 'Director',
    dataIndex: 'director',
  },
  {
    title: 'Country',
    dataIndex: 'country',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Year of Manufacture',
    dataIndex: 'year',
  },
  {
    title: 'actor',
    dataIndex: 'actor',
  },
];

export const Movies: React.FC = () => {
  const timestamp = Date.now();
  const [isModalDetailOpen, setIsDetailModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemMovies | null>(null);
  const [editedItem, setEditedItem] = useState<ItemMovies | null>(null);
  const [data, setData] = useState<Array<ItemMovies>>(dataOrigin);
  const [tableKey, setTableKey] = useState(0);

  return (
    <>
      <FormAddEditMovie
        isOpen={isModalAddOpen}
        handleCancel={() => {
          setIsModalAddOpen(false);
          setEditedItem(null);
        }}
        editItem={editedItem}
        isEditForm={isModalAddOpen}
      />
      <FormDetailMovie
        idMovie={selectedItem != null ? selectedItem.id : ''}
        isOpen={isModalDetailOpen}
        onCancel={() => setIsDetailModalOpen(false)}
      />
      <div>
        <h2 className="movies-header">Movies</h2>
        <div className="row">
          {statusCards.map((item, index) => (
            <div className="col-3" key={index}>
              <StatusCard
                icon={item.icon}
                count={item.count}
                title={item.title}
              />
            </div>
          ))}

          <div className="col-12">
            <div className="search-bar">
              <Search />
            </div>
            <div className="card__body">
              <Button
                type="primary"
                size="large"
                className="btn-new"
                icon={<PlusOutlined rev="" style={{ color: 'white' }} />}
                onClick={() => {
                  setIsModalAddOpen(true);
                }}
              >
                New Item
              </Button>
              <TableResult
                key={tableKey}
                originData={data}
                columns={columns}
                needOperationColumn={true}
                onEdit={(record: ItemType | null) => {
                  setEditedItem(record ? ({ ...record } as ItemMovies) : null);
                  setIsModalAddOpen(true);
                }}
                onClickRow={(record) => {
                  setSelectedItem(record as ItemMovies);
                  setIsDetailModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
