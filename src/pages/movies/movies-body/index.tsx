import React, { useEffect, useState } from 'react';
import { StatusCard } from '../../../components/status-card';
import { ItemType, TableResult } from '../../../components/table';
import { Button, TableProps } from 'antd';
import Search from 'antd/es/input/Search';
import { GenreMovie, ItemMovieHandled } from '../../../model/movie';
import axios from 'axios';
import { endpointServer } from '../../../utils/endpoint';
import { handleDataMovie } from '../../../utils/handleDataMovie';
import { columnsMovieTable } from '../column';
import { statusCard } from '../../user';
import { FilterValue } from 'antd/es/table/interface';

export type MoviesPageBody = {
  onEditItemTable?: (props?: any) => void;
  onClickRowTable?: (props?: any) => void;
  onAddItemTable?: (props?: any) => void;
};
export const MoviesPageBody = ({
  onEditItemTable = () => {},
  onClickRowTable = () => {},
  onAddItemTable = () => {},
}: MoviesPageBody) => {
  const [data, setData] = useState<Array<ItemMovieHandled>>([]);
  const [tableKey, _] = useState(0);
  const [resetData, setResetData] = useState(0);
  const [totalMovie, setTotalMovie] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

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

  const [genres, setGenres] = useState<GenreMovie[]>([]);

  const getAllGenre = () => {
    axios
      .get(`${endpointServer}/genres`)
      .then((res) => setGenres(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataTable();
    getAllGenre();
  }, [resetData, currPage]);

  const handleChange: TableProps<ItemType>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    setFilteredInfo(filters);
  };

  return (
    <div>
      <h2 className="movies-header">Quản lý phim</h2>
      <div className="row">
        {statusCard.map((item, index) => (
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
              columns={columnsMovieTable(filteredInfo, genres)}
              needOperationColumn={true}
              onEdit={(record: ItemType | null) => onEditItemTable(record)}
              onClickRow={(record) => onClickRowTable(record)}
              onAdd={onAddItemTable}
              totalData={totalMovie}
              onChangePagination={(e) => setCurrPage(e)}
              onChange={(pagination, filters, sorter, extra) => {
                handleChange(pagination, filters, sorter, extra);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
