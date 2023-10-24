import React, { useState } from 'react';
import { StatusCard } from '../../components/status-card/index';
import { TableResult } from '../../components/table/index';
import statusCards from '../../assets/JsonData/status-card-data.json';
import './index.scss';
import { Search } from '../../components/search/index';
import { Modal } from 'antd';
import { DatePicker, Form, Input, Select } from 'antd';
import { ItemVIPPackage } from '../dashboard/Item';
import moment from 'moment';
import dayjs from 'dayjs';

export interface ItemMovies {
  key: number;
  id: string;
  poster: string;
  namemovies: string;
  director: string;
  country: string;
  category: string;
  year: string;
  performer: string;
  language: string;
}

const dataOrigin: Array<ItemMovies> = [
  {
    key: 1,
    id: 's1',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'English',
  },
  {
    key: 14,
    id: '2',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'English',
  },
  {
    key: 3,
    id: '3',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'English',
  },
  {
    key: 1222,
    id: '4',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'English',
  },
  {
    key: 145,
    id: '5',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'English',
  },
  {
    key: 16,
    id: '6',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'English',
  },
  {
    key: 341,
    id: '11',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'Chinese',
  },
  {
    key: 21,
    id: '12',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'Chinese',
  },
  {
    key: 121,
    id: '13',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'Chinese',
  },
  {
    key: 122,
    id: '14',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'Chinese',
  },
  {
    key: 12,
    id: '21',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'Chinese',
  },
  {
    key: 13,
    id: '31',
    poster:
      'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    namemovies: 'Hoa Lang',
    director: 'Ngô Lỗi',
    country: 'Trung Quốc',
    category: 'Tình cảm',
    year: '2022-02-08',
    performer: 'sđssd',
    language: 'Chinese',
  },
];

const columns = [
  {
    title: 'POSTER',
    dataIndex: 'poster',
    render: (poster: string) => (
      <img
        src={poster}
        alt="poster"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    ),
  },
  {
    title: 'NAME MOVIES',
    dataIndex: 'namemovies',
  },
  {
    title: 'DIRECTOR',
    dataIndex: 'director',
  },
  {
    title: 'COUNTRY',
    dataIndex: 'country',
  },
  {
    title: 'CATEGORY',
    dataIndex: 'category',
  },
  {
    title: 'YEAR OF MANUFACTURE',
    dataIndex: 'year',
  },
  {
    title: 'PERFORMER',
    dataIndex: 'performer',
  },
];
export const Movies: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    ItemMovies | ItemVIPPackage | null
  >(null);
  const [editedItem, setEditedItem] = useState<ItemMovies | null>(null);
  const [data, setData] = useState<Array<ItemMovies>>(dataOrigin);
  const [tableKey, setTableKey] = useState(0);

  const handleOk = () => {
    if (editedItem) {
      const updatedData = data.map((item) => {
        if (item.key === editedItem.key) {
          return editedItem;
        }
        return item;
      });
      setData(updatedData);
      setTableKey((prevKey) => prevKey + 1);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
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
          <div className="card">
            <div className="search-bar">
              <Search />
            </div>
          </div>
          <div className="card__body">
            <TableResult
              key={tableKey}
              originData={data}
              columns={columns}
              needOperationColumn={true}
              onEdit={(record: ItemMovies | ItemVIPPackage | null) => {
                setSelectedItem(record);
                setEditedItem(record ? ({ ...record } as ItemMovies) : null);
                setIsModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Edit Movies"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="content-edit">
          {selectedItem && (
            <>
              <div className="poster">
                <img src={(selectedItem as ItemMovies).poster} alt="aaa" />
              </div>
              <div className="content">
                <div className="item">
                  <Form.Item label="Name Movie">
                    <Input
                      value={(editedItem && editedItem.namemovies) || ''}
                      onChange={(e) => {
                        if (editedItem) {
                          setEditedItem({
                            ...editedItem,
                            namemovies: e.target.value,
                          });
                        }
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Director">
                    <Input
                      value={(editedItem && editedItem.director) || ''}
                      onChange={(e) => {
                        if (editedItem) {
                          setEditedItem({
                            ...editedItem,
                            director: e.target.value,
                          });
                        }
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="item">
                  <Form.Item label="Country">
                    <Select
                      value={(editedItem && editedItem.country) || ''}
                      onChange={(value) => {
                        if (editedItem) {
                          setEditedItem({ ...editedItem, country: value });
                        }
                      }}
                    >
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Category">
                    <Select
                      value={(editedItem && editedItem.category) || ''}
                      onChange={(value) => {
                        if (editedItem) {
                          setEditedItem({ ...editedItem, category: value });
                        }
                      }}
                    >
                      <Select.Option value="Tình cảm">Tình cảm</Select.Option>
                      <Select.Option value="Hành động ">
                        Hành động
                      </Select.Option>
                      <Select.Option value="Giải trí">Giải trí</Select.Option>
                      <Select.Option value="Thể thao">Thể thao</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <Form.Item label="Performer">
                  <Input
                    value={(editedItem && editedItem.performer) || ''}
                    onChange={(e) => {
                      if (editedItem) {
                        setEditedItem({
                          ...editedItem,
                          performer: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Item>
                <div className="item">
                  <Form.Item label="Year of manufacture">
                    <DatePicker
                      value={dayjs(
                        (editedItem && editedItem.year) || '',
                      ).startOf('day')}
                      onChange={(date, dateString) => {
                        if (editedItem) {
                          setEditedItem({ ...editedItem, year: dateString });
                        }
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Language">
                    <Select
                      value={(editedItem && editedItem.language) || ''}
                      onChange={(value) => {
                        if (editedItem) {
                          setEditedItem({ ...editedItem, language: value });
                        }
                      }}
                    >
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <Form.Item label="Plot Summary">
                  <Input.TextArea showCount maxLength={100} />
                </Form.Item>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
