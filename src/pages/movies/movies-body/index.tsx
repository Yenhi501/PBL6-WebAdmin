import React, { useEffect, useState } from 'react';
import { StatusCard } from '../../../components/status-card';
import { ItemType, TableResult } from '../../../components/table';
import { Button, Spin, TableProps } from 'antd';
import Search from 'antd/es/input/Search';
import { GenreMovie, ItemMovieHandled } from '../../../model/movie';
import axios from 'axios';
import { endpointServer } from '../../../utils/endpoint';
import { handleDataMovie } from '../../../utils/handleDataMovie';
import { columnsMovieTable } from '../column';
import { FilterValue } from 'antd/es/table/interface';
import { useToken } from '../../../hooks/useToken';

export type MoviesPageBody = {
  onEditItemTable?: (props?: any) => void;
  onClickRowTable?: (props?: any) => void;
  onAddItemTable?: (props?: any) => void;
  resetData?: number;
  setResetData?: (props?: any) => void;
};
export const MoviesPageBody = ({
  onEditItemTable = () => {},
  onClickRowTable = () => {},
  onAddItemTable = () => {},
  setResetData = () => {},
  resetData,
}: MoviesPageBody) => {
  const [data, setData] = useState<Array<ItemMovieHandled>>([]);
  const [tableKey, _] = useState(0);
  const [totalMovie, setTotalMovie] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const { accessToken } = useToken();
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const getDataTable = (value?: string) => {
    setIsLoading(true);
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
        setIsLoading(false);
        setTotalMovie(response.data.totalCount);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const deleteMovie = (movieId: number) => {
    axios
      .delete(`${endpointServer}/movies/${movieId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setResetData((prev: number) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [genres, setGenres] = useState<GenreMovie[]>([]);
  const [nations, setNations] = useState<string[]>([]);

  const getAllGenre = () => {
    axios
      .get(`${endpointServer}/genres`)
      .then((res) => setGenres(res.data))
      .catch((err) => console.log(err));
  };

  const getAllNations = () => {
    axios
      .get(`${endpointServer}/movies/get/nations`)
      .then((res) => setNations(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataTable();
  }, [resetData, currPage]);

  useEffect(() => {
    getAllNations();
    getAllGenre();
  }, []);

  const handleChange: TableProps<ItemType>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    setFilteredInfo(filters);
  };

  const statusCard = [
    {
      icon: 'bx bx-shopping-bag',
      count: totalMovie,
      title: 'Tổng phim',
    },
    {
      icon: 'bx bx-cart',
      count: genres.length,
      title: 'Thể loại',
    },
    {
      icon: 'bx bx-dollar-circle',
      count: nations.length,
      title: 'Quốc gia',
    },
    {
      icon: 'bx bx-receipt',
      count: '20',
      title: 'Phim VIP',
    },
  ];

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
            <Button onClick={() => setResetData((prev: number) => prev + 1)}>
              Làm mới
            </Button>
          </div>
          <div className="card__body">
            <Spin spinning={isLoading}>
              <TableResult
                key={tableKey}
                originData={data}
                columns={columnsMovieTable(filteredInfo, genres)}
                needOperationColumn={true}
                onEdit={(record: ItemType | null) => onEditItemTable(record)}
                onClickRow={(record) => onClickRowTable(record)}
                onAdd={onAddItemTable}
                onDelete={(record) => deleteMovie(record.movieId)}
                totalData={totalMovie}
                onChangePagination={(e) => setCurrPage(e)}
                onChange={(pagination, filters, sorter, extra) => {
                  handleChange(pagination, filters, sorter, extra);
                }}
              />
            </Spin>
          </div>
        </div>
      </div>
    </div>
  );
};
