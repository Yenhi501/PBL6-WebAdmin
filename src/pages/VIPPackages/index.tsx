import React, { useState } from 'react';
import { StatusCard } from '../../components/status-card/index';
import { ItemType, TableResult } from '../../components/table/index';
import './index.scss';
import { Button, Tabs, TabsProps } from 'antd';
import { ItemVIPPackage } from '../Item';
import {
  columnTables,
  columnTablesUserVIP,
  itemTabs,
  statusCard,
} from './value-item-component';
import { FormAddEditVIPPackage } from '../../components/form-VIP/form-add-edit-VIP-package';
import { FormAddEditVIPUser } from '../../components/form-VIP/form-add-edit-VIP-user';
import { VIPUser } from '../../model/VIPUser';
import moment from 'moment';
import Search from 'antd/es/input/Search';
import axios from 'axios';

const dataOrigin: Array<ItemVIPPackage> = [
  {
    key: '1',
    id: 'VM',
    name: 'VIP by 1 month',
    user: 20,
    time: 30,
    status: 'active',
    discount: 10,
    price: 19,
  },
];

const dataOriginVIPUser: Array<VIPUser> = [
  {
    key: '1',
    id: '1',
    idPackage: 'V1',
    durationPackage: 30,
    dateExpire: moment('2020-06-09T12:40:14+0000').calendar(),
    dateRegistered: moment('2020-06-09T12:40:14+0000').calendar(),
    dayLeft: 30,
  },
];

const urlMap: Record<string, string> = {
  '1': 'http://localhost:8000/api/subscription/get-all-subscription-type',
  '2': '',
};

export const VIPPackages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVIPUserOpen, setIsModalVIPUserOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemVIPPackage | null>(null);
  const [editedVIPUser, setEditedVIPUser] = useState<VIPUser | null>(null);
  const [resetData, setResetData] = useState(0);
  const [activeKey, setActiveKey] = useState<string>('1');

  const [data, setData] = useState<Array<ItemVIPPackage>>(dataOrigin);
  const [dataVIPUser, setDataVIPUser] =
    useState<Array<VIPUser>>(dataOriginVIPUser);

  const getData = () => {
    axios({
      method: 'GET',
      url: '',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <div className="VIP-container">
      <FormAddEditVIPPackage
        isOpen={isModalOpen}
        handleCancel={() => {
          setIsModalOpen(false);
          setEditedItem(null);
        }}
        editItem={editedItem}
        isEditForm={editedItem != null ? true : false}
      />
      <FormAddEditVIPUser
        isOpen={isModalVIPUserOpen}
        handleCancel={() => {
          setIsModalVIPUserOpen(false);
          setEditedVIPUser(null);
        }}
        editItem={editedVIPUser}
        isEditForm={editedVIPUser != null ? true : false}
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
              <Search placeholder="Nhập tên gói" />
              <Button onClick={() => setResetData((prev) => prev + 1)}>
                Làm mới
              </Button>
            </div>
            <TableResult
              key={activeKey}
              originData={activeKey === '1' ? data : dataVIPUser}
              columns={activeKey === '1' ? columnTables : columnTablesUserVIP}
              needOperationColumn={true}
              onEdit={(record: ItemType | null) => {
                if (activeKey === '1') {
                  setEditedItem(
                    record ? ({ ...record } as ItemVIPPackage) : null,
                  );
                  setIsModalOpen(true);
                } else {
                  setEditedVIPUser(record ? ({ ...record } as VIPUser) : null);
                  setIsModalVIPUserOpen(true);
                }
              }}
              onAdd={() =>
                activeKey === '1'
                  ? setIsModalOpen(true)
                  : setIsModalVIPUserOpen(true)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
