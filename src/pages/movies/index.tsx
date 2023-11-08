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
  url?: string;
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
    title: 'Poster',
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
    title: 'Url',
    dataIndex: 'url',
    width: '10',
  },
  {
    title: 'Name Movies',
    dataIndex: 'namemovies',
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
    title: 'Performer',
    dataIndex: 'performer',
  },
];

export const Movies: React.FC = () => {
  const timestamp = Date.now();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
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
  const [newPoster, setNewPoster] = useState('');
  const [newName, setNewName] = useState('');
  const [newDirector, setNewDirector] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPerformer, setNewPerformer] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newURL, setNewURL] = useState('');
  const handleAddOk = () => {
    const newMovie = {
      key: timestamp,
      id: String(timestamp),
      poster: newPoster,
      namemovies: newName,
      director: newDirector,
      country: newCountry,
      category: newCategory,
      year: dayjs(newYear).startOf('day').format('YYYY-MM-DD'),
      performer: newPerformer,
      language: newLanguage,
      url: newURL,
    };

    setData((prevData) => [newMovie, ...prevData]);
    setTableKey((prevKey) => prevKey + 1);

    // setNewPoster('');
    setNewName('');
    setNewDirector('');
    setNewCountry('');
    setNewCategory('');
    setNewPerformer('');
    setNewYear('');
    setNewLanguage('');
    setNewURL('');
    setIsModalAddOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalAddOpen(false);
  };

  const handleAdd = () => {
    setIsModalAddOpen(true);
  };
  //

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
          <div className="search-bar">
            <Search />
          </div>
          <div className="card__body">
            <Button
              type="primary"
              size="large"
              className="btn-new"
              icon={<PlusOutlined rev="" style={{ color: 'white' }} />}
              onClick={() => handleAdd()}
            >
              New Item
            </Button>
            <TableResult
              key={tableKey}
              originData={data}
              columns={columns}
              needOperationColumn={true}
              onEdit={(record: ItemType | null) => {
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
                <Form.Item label="URL">
                  <Input
                    value={(editedItem && editedItem.url) || ''}
                    onChange={(e) => {
                      if (editedItem) {
                        setEditedItem({
                          ...editedItem,
                          url: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Item>
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
      <Modal
        title="Add New Movies"
        open={isModalAddOpen}
        onOk={handleAddOk}
        onCancel={handleCancel}
      >
        <div className="content-edit">
          <>
            <div className="poster">
              <PosterUpload
                value={newPoster}
                onChange={(url) => setNewPoster(url)}
              />
            </div>
            <div className="content">
              <div className="item">
                <Form.Item label="Name Movie">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Director">
                  <Input
                    value={newDirector}
                    onChange={(e) => setNewDirector(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="item">
                <Form.Item label="Country">
                  <Select
                    value={newCountry}
                    onChange={(value) => setNewCountry(value)}
                  >
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Category">
                  <Select
                    value={newCategory}
                    onChange={(value) => setNewCategory(value)}
                  >
                    <Select.Option value="Tình cảm">Tình cảm</Select.Option>
                    <Select.Option value="Hành động ">Hành động</Select.Option>
                    <Select.Option value="Giải trí">Giải trí</Select.Option>
                    <Select.Option value="Thể thao">Thể thao</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item label="URL">
                <Input
                  value={newURL}
                  onChange={(e) => setNewURL(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Performer">
                <Input
                  value={newPerformer}
                  onChange={(e) => setNewPerformer(e.target.value)}
                />
              </Form.Item>
              <div className="item">
                <Form.Item label="Year of manufacture">
                  <DatePicker
                    value={newYear ? dayjs(newYear) : null}
                    onChange={(date, dateString) => setNewYear(dateString)}
                  />
                </Form.Item>
                <Form.Item label="Language">
                  <Select
                    value={newLanguage}
                    onChange={(value) => setNewLanguage(value)}
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
        </div>
      </Modal>
    </div>
  );
};
