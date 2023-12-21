import { TabsProps, Tag } from 'antd';
import { UserInfo } from '../../components/userInfo';
import { ColumnsType } from 'antd/es/table';
import { ItemType } from '../../components/table';
import { Duration, VIPPackageType } from '../../model/VIPPackage-info';

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
    dataIndex: 'subscriptionInfoId',
  },
  {
    title: 'Tên gói',
    dataIndex: 'subscriptionType',
    render: (value: VIPPackageType) => <>{value.name}</>,
  },
  {
    title: 'Số người dùng',
    dataIndex: 'user',
  },
  {
    title: 'Thời gian',
    dataIndex: 'duration',
    render: (value: Duration) => (
      <>
        {value.time > 10 ? '' : '0'}
        {value.time} tháng
      </>
    ),
  },
  {
    title: 'Giảm giá',
    dataIndex: 'discount',
    render: (value: number) => <>{value * 100}%</>,
  },
  {
    title: 'Giá',
    dataIndex: 'subscriptionType',
    render: (value: VIPPackageType) => (
      <>{value.price.toLocaleString('it-IT')}₫</>
    ),
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
