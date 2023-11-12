import { Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';
import { FormAddEditVIPPackage } from '../../components/form-VIP/form-add-edit-VIP-package';
import { StatusCard } from '../../components/status-card/index';
import { TableVIPPackage } from '../../components/table-VIP';
import { ItemType } from '../../components/table/index';
import { ItemVIPPackage } from '../Item';
import './index.scss';
import {
  VIPUser,
  columnTables,
  columnTablesUserVIP,
} from './value-item-component';

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
    package: 'VIP by 1 month',
    expireDate: '20/10/2023',
    dayLeft: 30,
  },
  {
    key: '1',
    id: '2',
    package: 'VIP by 1 month',
    expireDate: '20/10/2023',
    dayLeft: 30,
  },
  {
    key: '1',
    id: '3',
    package: 'VIP by 1 month',
    expireDate: '20/10/2023',
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
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [editedItem, setEditedItem] = useState<ItemVIPPackage | null>(null);
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
            setSelectedItem(record);
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
            setSelectedItem(record);
            setEditedItem(record ? ({ ...record } as ItemVIPPackage) : null);
            setIsModalOpen(true);
          }}
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
