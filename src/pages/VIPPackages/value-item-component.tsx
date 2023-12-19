import { TabsProps, Tag } from 'antd';
import { UserInfo } from '../../components/userInfo';
import { ColumnsType } from 'antd/es/table';
import { ItemType } from '../../components/table';

export const itemTabs: TabsProps['items'] = [
  {
    key: '1',
    label: 'VIP packages',
  },
  {
    key: '2',
    label: 'VIP user',
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

export const columnTables: ColumnsType<ItemType> = [
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

export const columnTablesUserVIP: ColumnsType<ItemType> = [
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
