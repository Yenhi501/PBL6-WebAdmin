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
import {
  columnTables,
  columnTablesUserVIP,
} from '../VIPPackages/value-item-component';
import { ItemMovies } from '../movies';
import { FormAddEditVIPPackage } from '../../components/form-VIP/form-add-edit-VIP-package';
import { TableVIPPackage } from '../../components/table-VIP';
import { FormAddEditVIPUser } from '../../components/form-VIP/form-add-edit-VIP-user';
import { VIPUser } from '../../model/VIPUser';
import { FormAddEditUser } from '../../components/form-user';
import { User } from '../../model/user';
import { columnTableUser } from './column-table-user';
import moment from 'moment';

export const statusCard = [
  {
    icon: 'bx bx-shopping-bag',
    count: '3',
    title: 'Total User',
  },
  {
    icon: 'bx bx-cart',
    count: '200',
    title: 'New user (week)',
  },
  {
    icon: 'bx bx-dollar-circle',
    count: '50',
    title: 'New user (month)',
  },
  {
    icon: 'bx bx-receipt',
    count: '20',
    title: 'Ban user',
  },
];

export const UserPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<User | null>(null);
  const [data, setData] = useState<Array<User>>([
    {
      key: '1',
      id: '1',
      dateCreated: moment('2020-06-09T12:40:14+0000').calendar(),
      status: 'Active',
      role: 'User',
    },
    {
      key: '2',
      id: '2',
      dateCreated: moment('2020-06-09T12:40:14+0000').calendar(),
      status: 'Ban',
      role: 'VIP User',
    },
    {
      key: '3',
      id: '3',
      dateCreated: moment('2020-06-09T12:40:14+0000').calendar(),
      status: 'Active',
      role: 'Admin',
    },
  ]);

  return (
    <div>
      <FormAddEditUser
        isOpen={isModalOpen}
        handleCancel={() => {
          setIsModalOpen(false);
          setEditedItem(null);
        }}
        editItem={editedItem}
        isEditForm={editedItem != null ? true : false}
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
            <TableVIPPackage
              originData={data}
              columns={columnTableUser}
              needOperationColumn={true}
              onEdit={(record: ItemType | null) => {
                setEditedItem(record ? ({ ...record } as User) : null);
                setIsModalOpen(true);
              }}
              onNewBtnClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
