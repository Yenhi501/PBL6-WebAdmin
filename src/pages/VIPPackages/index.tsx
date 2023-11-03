import React, { useState } from 'react';
import { StatusCard } from '../../components/status-card/index';
import { TableResult } from '../../components/table/index';
import statusCards from '../../assets/JsonData/status-card-data.json';
import './index.scss';
import { Search } from '../../components/search/index';
import { ItemVIPPackage } from '../Item';
import { Modal, Tag } from 'antd';

const data: Array<ItemVIPPackage> = [
  {
    key: 1,
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: 2,
    id: 'ID11',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'inactive',
    price: '79000 ₫',
  },
  {
    key: 3,
    id: 'ID12',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: 4,
    id: 'ID13',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: 6,
    id: 'ID14',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: 180,
    id: 'ID21',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'inactive',
    price: '79000 ₫',
  },
  {
    key: 168,
    id: 'ID31',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: 185,
    id: 'ID41',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'inactive',
    price: '79000 ₫',
  },
  {
    key: 182,
    id: 'ID111',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: 181,
    id: 'ID61',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: 132,
    id: 'ID71',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: 123,
    id: 'ID81',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: 'User',
    dataIndex: 'user',
    editable: true,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    editable: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    editable: true,
    key: 'status',
    render: (_: string, { status }: { status: string }) => {
      let color;
      if (status === 'inactive') {
        color = 'volcano';
      } else {
        color = 'green';
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    editable: true,
  },
];

export const VIPPackages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
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
          <div className="card">
            <div className="search-bar">
              <Search />
            </div>
          </div>
          <div className="card__body">
            <TableResult
              originData={data}
              columns={columns}
              needOperationColumn={true}
              onEdit={showModal}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
