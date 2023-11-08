import { UserInfo } from '../../components/userInfo';

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

export const columnTablesUserVIP = [
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
    dataIndex: 'package',
  },
  {
    title: 'Expiration date',
    dataIndex: 'expireDate',
  },
  {
    title: 'Day left',
    dataIndex: 'dayLeft',
  },
];

export interface VIPUser {
  key: string;
  id: string;
  package: string;
  expireDate: string;
  dayLeft: number;
}
