import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import statusCards from '../../assets/JsonData/status-card-data.json';
import { StatusCard } from '../../components/status-card/index';
import { ItemType, TableResult } from '../../components/table/index';
import './index.scss';
import { FormDetailMovie } from '../../components/form-movie';
import { FormAddEditMovie } from '../../components/form-movie/form-add-edit-movie';
import axios from 'axios';
import { ItemMovieHandled, ItemMovieRaw } from '../../model/movie';
import { columnsMovieTable } from './column';
import { handleDataMovie } from '../../utils/handleDataMovie';
import Search, { SearchProps } from 'antd/es/input/Search';
import { endpointServer } from '../../utils/endpoint';

export const MovieContext = React.createContext({ isOpen: false });

export const Movies: React.FC = () => {
  const [isModalDetailOpen, setIsDetailModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemMovieHandled | null>(null);
  const [selectedItem, setSelectedItem] = useState<ItemMovieHandled | null>(
    null,
  );
  const [data, setData] = useState<Array<ItemMovieHandled>>([]);
  const [tableKey, setTableKey] = useState(0);
  const [resetData, setResetData] = useState(0);
  const [totalMovie, setTotalMovie] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const getDataTable = (value?: string) => {
    const paramsSearch =
      value != null
        ? {
            search: value,
            page: currPage,
            pageSize: 5,
          }
        : { page: currPage, pageSize: 5 };
    axios
      .get(`${endpointServer}/movies`, {
        headers: { 'Content-Type': 'application/json' },
        params: paramsSearch,
      })
      .then((response) => {
        const dataFilms = handleDataMovie(response.data);
        setData(dataFilms);
        setTotalMovie(response.data.totalCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataTable();
  }, [resetData, currPage]);

  return (
    <MovieContext.Provider value={{ isOpen: isModalAddOpen }}>
      <FormAddEditMovie
        isOpen={isModalAddOpen}
        handleCancel={() => {
          setIsModalAddOpen(false);
          setEditedItem(null);
        }}
        editItem={editedItem}
        isEditForm={editedItem != null ? true : false}
      />
      <FormDetailMovie
        selectedItem={selectedItem}
        isOpen={isModalDetailOpen}
        onCancel={() => setIsDetailModalOpen(false)}
      />
      <div>
        <h2 className="movies-header">Quản lý phim</h2>
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
              <Search
                placeholder="Nhập tên/mô tả phim"
                onSearch={(e) => getDataTable(e)}
              />
              <Button onClick={() => setResetData((prev) => prev + 1)}>
                Làm mới
              </Button>
            </div>
            <div className="card__body">
              <TableResult
                key={tableKey}
                originData={data}
                columns={columnsMovieTable}
                needOperationColumn={true}
                onEdit={(record: ItemType | null) => {
                  setEditedItem(
                    record ? ({ ...record } as ItemMovieHandled) : null,
                  );
                  setIsModalAddOpen(true);
                }}
                onClickRow={(record) => {
                  setSelectedItem(record as ItemMovieHandled);
                  setIsDetailModalOpen(true);
                }}
                onAdd={() => setIsModalAddOpen(true)}
                totalData={totalMovie}
                onChangePagination={(e) => setCurrPage(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </MovieContext.Provider>
  );
};
