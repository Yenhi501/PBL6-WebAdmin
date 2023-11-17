import React, { useState } from 'react';
import { StatusCard } from '../../components/status-card/index';
import { ItemType } from '../../components/table/index';
import './index.scss';
import { Tabs, TabsProps } from 'antd';
import { TableVIPPackage } from '../../components/table-VIP';
import moment from 'moment';
import { columnTables } from './columns-table-director-user';
import { ActorDirector } from '../../model/director-actor';
import { FormAddEditDA } from '../../components/form-actor-director';

const dataDirector: Array<ActorDirector> = [
  {
    key: '1',
    id: 'VM',
    name: 'VIP by 1 month',
    dateOfBirth: moment('2020-06-09T12:40:14+0000').calendar(),
    gender: 'Nam',
    amountOfFilm: 30,
  },
  {
    key: '1',
    id: 'VM',
    name: 'VIP by 1 month',
    dateOfBirth: moment('2020-06-09T12:40:14+0000').calendar(),
    gender: 'Nam',
    amountOfFilm: 30,
  },
  {
    key: '1',
    id: 'VM',
    name: 'VIP by 1 month',
    dateOfBirth: moment('2020-06-09T12:40:14+0000').calendar(),
    gender: 'Nam',
    amountOfFilm: 30,
  },
];

const dataActor: Array<ActorDirector> = [
  {
    key: '1',
    id: 'VM',
    name: 'VIP by 1 month',
    dateOfBirth: moment('2020-06-09T12:40:14+0000').calendar(),
    gender: 'Nam',
    amountOfFilm: 30,
  },
  {
    key: '1',
    id: 'VM',
    name: 'VIP by 1 month',
    dateOfBirth: moment('2020-06-09T12:40:14+0000').calendar(),
    gender: 'Nam',
    amountOfFilm: 30,
  },
  {
    key: '1',
    id: 'VM',
    name: 'VIP by 1 month',
    dateOfBirth: moment('2020-06-09T12:40:14+0000').calendar(),
    gender: 'Nam',
    amountOfFilm: 30,
  },
];

export const statusCard = [
  {
    icon: 'bx bx-shopping-bag',
    count: '3',
    title: 'Diễn viên',
  },
  {
    icon: 'bx bx-cart',
    count: '200',
    title: 'Đạo diễn',
  },
  {
    icon: 'bx bx-dollar-circle',
    count: '50',
    title: 'Diễn viên mới',
  },
  {
    icon: 'bx bx-receipt',
    count: '20',
    title: 'Đạo diễn mới',
  },
];

export const DAPage: React.FC = () => {
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const [isModalDOpen, setIsModalDOpen] = useState(false);
  const [editedItemA, setEditedItemA] = useState<ActorDirector | null>(null);
  const [editedItemD, setEditedItemD] = useState<ActorDirector | null>(null);

  const [dataA, setDataA] = useState<Array<ActorDirector>>(dataActor);
  const [dataD, setDataD] = useState<Array<ActorDirector>>(dataDirector);

  const itemTabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'Diễn viên',
      children: (
        <TableVIPPackage
          originData={dataA}
          columns={columnTables}
          needOperationColumn={true}
          onEdit={(record: ItemType | null) => {
            setEditedItemA(record ? ({ ...record } as ActorDirector) : null);
            setIsModalAOpen(true);
          }}
          onNewBtnClick={() => setIsModalAOpen(true)}
        />
      ),
    },
    {
      key: '2',
      label: 'Đạo diễn',
      children: (
        <TableVIPPackage
          originData={dataD}
          columns={columnTables}
          needOperationColumn={true}
          onEdit={(record: ItemType | null) => {
            setEditedItemD(record ? ({ ...record } as ActorDirector) : null);
            setIsModalDOpen(true);
          }}
          onNewBtnClick={() => setIsModalDOpen(true)}
        />
      ),
    },
  ];

  return (
    <div className="director-actor-container">
      <FormAddEditDA
        isOpen={isModalAOpen}
        handleCancel={() => {
          setIsModalAOpen(false);
          setEditedItemA(null);
        }}
        editItem={editedItemA}
        isEditForm={editedItemA != null ? true : false}
      />
      <FormAddEditDA
        isOpen={isModalDOpen}
        handleCancel={() => {
          setIsModalDOpen(false);
          setEditedItemD(null);
        }}
        editItem={editedItemD}
        isEditForm={editedItemD != null ? true : false}
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
            <Tabs defaultActiveKey="1" items={itemTabs} />
          </div>
        </div>
      </div>
    </div>
  );
};
