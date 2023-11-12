import { TabsProps, Tag } from 'antd';
import { UserInfo } from '../../components/userInfo';
import { ItemColumn } from '../Item';

export const columnTables = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: '10',
  },
  {
    title: 'Amount of User',
    dataIndex: 'user',
  },
  {
    title: 'Time',
    dataIndex: 'time',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => {
      let color = '';
      switch (status) {
        case 'active':
          color = 'green';
          break;
        case 'inactive':
          color = 'red';
          break;
        case 'pending':
          color = 'orange';
          break;
        default:
          break;
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
];

export const columnTablesUserVIP: ItemColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'User',
    dataIndex: 'user',
    render: (idUser: string) => <UserInfo id={idUser} />,
  },
  {
    title: 'Package',
    dataIndex: 'idPackage',
    render: (idPackage: string) => <div>{idPackage}</div>,
  },
  {
    title: 'Duration',
    dataIndex: 'durationPackage',
  },
  {
    title: 'Expiration date',
    dataIndex: 'dateExpire',
  },
  {
    title: 'Registered date',
    dataIndex: 'dateRegistered',
  },
  {
    title: 'Day left',
    dataIndex: 'dayLeft',
  },
];
