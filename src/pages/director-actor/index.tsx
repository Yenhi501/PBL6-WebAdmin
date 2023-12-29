import React, { useEffect, useState } from 'react';
import { StatusCard } from '../../components/status-card/index';
import { ItemType, TableResult } from '../../components/table/index';
import './index.scss';
import { Button, Tabs } from 'antd';
import {
  getColumnTables,
  itemTabs,
  statusCard,
} from './columns-table-director-user';
import { ActorDirector } from '../../model/director-actor';
import { FormAddEditDA } from '../../components/form-actor-director';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import { endpointServer } from '../../utils/endpoint';
import { useToken } from '../../hooks/useToken';

const urlQueryMap: Record<string, string> = {
  '1': `${endpointServer}/individuals/actors`,
  '2': `${endpointServer}/individuals/directors`,
};

export const DAPage: React.FC = () => {
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<ActorDirector | null>(null);
  const [data, setData] = useState<Array<ActorDirector>>([]);
  const [resetData, setResetData] = useState(0);
  const [activeKey, setActiveKey] = useState<string>('1');
  const [totalItems, setTotalItems] = useState(0);
  const [currPage, setCurrentPage] = useState(1);
  const { accessToken } = useToken();

  const getData = (nameSearch?: string) => {
    const params =
      nameSearch != null
        ? { name: nameSearch, page: currPage, pageSize: 5 }
        : {
            page: currPage,
            pageSize: 5,
          };
    axios({
      method: 'GET',
      url: urlQueryMap[activeKey],
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      params: params,
    })
      .then((response) => {
        console.log(response);

        const dataRes = response.data.data;

        if (activeKey === '1') {
          dataRes.actors.forEach(
            (actor: ActorDirector, index: number) => (actor.key = index + 1),
          );
          setData(dataRes.actors);
          setTotalItems(dataRes.totalActors);
        } else {
          dataRes.directors.forEach(
            (actor: ActorDirector, index: number) => (actor.key = index + 1),
          );
          setData(dataRes.directors);
          setTotalItems(dataRes.totalDirectors);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [resetData, activeKey, currPage]);

  return (
    <div className="director-actor-container">
      <FormAddEditDA
        isOpen={isModalAOpen}
        handleCancel={() => {
          setIsModalAOpen(false);
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
          <div className="card__body">
            <Tabs
              activeKey={activeKey}
              items={itemTabs}
              onChange={(e) => setActiveKey(e)}
            />
            <div className="search-bar">
              <Search placeholder="Nhập tên" onSearch={(e) => getData(e)} />
              <Button onClick={() => setResetData((prev) => prev + 1)}>
                Làm mới
              </Button>
            </div>
            <TableResult
              originData={data || []}
              columns={getColumnTables(
                activeKey === '1' ? 'actor' : 'director',
              )}
              needOperationColumn={true}
              onEdit={(record: ItemType | null) => {
                setEditedItem(record ? ({ ...record } as ActorDirector) : null);
                setIsModalAOpen(true);
              }}
              onAdd={() => setIsModalAOpen(true)}
              totalData={totalItems}
              onChangePagination={(e) => setCurrentPage(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
