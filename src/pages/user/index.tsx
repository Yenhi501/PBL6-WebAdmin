import { Button, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FormAddEditUser } from '../../components/form-user';
import { StatusCard } from '../../components/status-card/index';
import { ItemType, TableResult } from '../../components/table/index';
import { useToken } from '../../hooks/useToken';
import { User } from '../../model/user';
import { endpointServer } from '../../utils/endpoint';
import { columnTableUser } from './column-table-user';
import './index.scss';

export const statusCard = [
  {
    icon: 'bx bx-shopping-bag',
    count: '50',
    title: 'Người dùng',
  },
  {
    icon: 'bx bx-cart',
    count: '10',
    title: 'Người dùng mới (Tuần)',
  },
  {
    icon: 'bx bx-dollar-circle',
    count: '50',
    title: 'Người mới (Tháng)',
  },
  {
    icon: 'bx bx-receipt',
    count: '20',
    title: 'Người dùng bị cấm',
  },
];

export const UserPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<User | null>(null);
  const [resetData, setResetData] = useState(0);
  const [data, setData] = useState<Array<User>>([]);
  const [totalUser, setTotalUser] = useState(0);
  const [currPage, setCurrentPage] = useState(1);
  const { accessToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);

  const getUser = (value?: string) => {
    setIsLoading(true);
    const defaultParams = {
      page: currPage,
      pageSize: 5,
    };

    const paramsSearch =
      value != null
        ? {
            search: value,
            ...defaultParams,
          }
        : defaultParams;
    axios
      .get(`${endpointServer}/user/get-all-users`, {
        params: paramsSearch,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        response.data.data.forEach(
          (item: User, index: number) => (item.key = index + 1),
        );
        setTotalUser(response.data.totalCount);
        setData(response.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const deleteUser = (userId: number) => {
    axios
      .delete(`${endpointServer}/user/delete-user?userId=${userId}`, {
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

  useEffect(() => {
    getUser();
  }, [resetData, currPage]);

  return (
    <div className="user-container">
      <FormAddEditUser
        isOpen={isModalOpen}
        handleCancel={() => {
          setIsModalOpen(false);
          setEditedItem(null);
        }}
        editItem={editedItem}
        isEditForm={editedItem != null ? true : false}
        resetDataTable={() => setResetData((prev) => prev + 1)}
      />
      <h2 className="movies-header">VIP Packages</h2>
      <div className="content-container">
        <div className="status-container">
          {statusCard.map((item, index) => (
            <div className="status-item" key={index}>
              <StatusCard
                icon={item.icon}
                count={item.count}
                title={item.title}
              />
            </div>
          ))}
        </div>
        <div className="col-12">
          <div className="search-bar">
            <Search placeholder="Nhập email/tên" onSearch={(e) => getUser(e)} />
            <Button onClick={() => setResetData((prev) => prev + 1)}>
              Làm mới
            </Button>
          </div>
          <Spin spinning={isLoading}>
            <div className="card__body">
              <TableResult
                originData={data}
                columns={columnTableUser}
                needOperationColumn={true}
                onEdit={(record: ItemType | null) => {
                  setEditedItem(record ? ({ ...record } as User) : null);
                  setIsModalOpen(true);
                }}
                onDelete={(record) => deleteUser(record.userId)}
                onAdd={() => setIsModalOpen(true)}
                totalData={totalUser}
                onChangePagination={(e) => setCurrentPage(e)}
              />
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
