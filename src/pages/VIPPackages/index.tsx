import React, { useState } from 'react';
import { StatusCard } from '../../components/status-card/index';
import { ItemType } from '../../components/table/index';
import './index.scss';
import { Button, Modal, Tabs, TabsProps } from 'antd';
import { DatePicker, Form, Input, Select } from 'antd';
import { ItemVIPPackage } from '../Item';
import dayjs from 'dayjs';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { PosterUpload } from '../../components/upload-poster';
import { columnTables, columnTablesUserVIP } from './value-item-component';
import { ItemMovies } from '../movies';
import { FormAddEditVIPPackage } from '../../components/form-VIP/form-add-edit-VIP-package';
import { TableVIPPackage } from '../../components/table-VIP';
import { FormAddEditVIPUser } from '../../components/form-VIP/form-add-edit-VIP-user';
import { VIPUser } from '../../model/VIPUser';
import moment from 'moment';

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
  {
    key: '1',
    id: 'VHY',
    name: 'VIP by 6 month',
    user: 20,
    time: 133,
    status: 'active',
    discount: 0,
    price: 19,
  },
  {
    key: '1',
    id: 'VM',
    name: 'VIP by 1 month',
    user: 20,
    time: 365,
    status: 'pending',
    discount: 20,
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
  {
    key: '2',
    id: '2',
    idPackage: 'V1',
    durationPackage: 30,
    dateExpire: moment('2020-06-09T12:40:14+0000').calendar(),
    dateRegistered: moment('2020-06-09T12:40:14+0000').calendar(),
    dayLeft: 30,
  },
  {
    key: '3',
    id: '3',
    idPackage: 'V1',
    durationPackage: 30,
    dateExpire: moment('2020-06-09T12:40:14+0000').calendar(),
    dateRegistered: moment('2020-06-09T12:40:14+0000').calendar(),
    dayLeft: 30,
  },
];

export const statusCard = [
  {
    icon: 'bx bx-shopping-bag',
    count: '3',
    title: 'VIP packages',
  },
  {
    icon: 'bx bx-cart',
    count: '200',
    title: 'VIP user',
  },
  {
    icon: 'bx bx-dollar-circle',
    count: '50',
    title: 'Expire user',
  },
  {
    icon: 'bx bx-receipt',
    count: '20',
    title: 'Renew user in month',
  },
];

export const VIPPackages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVIPUserOpen, setIsModalVIPUserOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemVIPPackage | null>(null);
  const [editedVIPUser, setEditedVIPUser] = useState<VIPUser | null>(null);

  const [data, setData] = useState<Array<ItemVIPPackage>>(dataOrigin);
  const [dataVIPUser, setDataVIPUser] =
    useState<Array<VIPUser>>(dataOriginVIPUser);

  const itemTabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'VIP packages',
      children: (
        <TableVIPPackage
          originData={data}
          columns={columnTables}
          needOperationColumn={true}
          onEdit={(record: ItemType | null) => {
            setEditedItem(record ? ({ ...record } as ItemVIPPackage) : null);
            setIsModalOpen(true);
          }}
          onNewBtnClick={() => setIsModalOpen(true)}
        />
      ),
    },
    {
      key: '2',
      label: 'VIP user',
      children: (
        <TableVIPPackage
          originData={dataVIPUser}
          columns={columnTablesUserVIP}
          needOperationColumn={true}
          onEdit={(record: ItemType | null) => {
            setEditedVIPUser(record ? ({ ...record } as VIPUser) : null);
            setIsModalVIPUserOpen(true);
          }}
          onNewBtnClick={() => setIsModalVIPUserOpen(true)}
        />
      ),
    },
  ];

  return (
    <div>
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
          <div className="card__body">
            <Tabs defaultActiveKey="1" items={itemTabs} />
          </div>
        </div>
      </div>
    </div>
  );
};
