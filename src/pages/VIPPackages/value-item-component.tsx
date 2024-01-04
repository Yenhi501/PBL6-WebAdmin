import { TabsProps, Tag } from 'antd';
import { UserInfo } from '../../components/userInfo';
import { ColumnsType } from 'antd/es/table';
import { ItemType } from '../../components/table';
import {
  Duration,
  VIPPackageType,
  VIPPackageUserInfo,
} from '../../model/VIPPackage-info';
import dayjs from 'dayjs';

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
    dataIndex: 'subscription_info_id',
  },
  {
    title: 'Tên gói',
    dataIndex: 'subscriptionType',
    render: (value: VIPPackageType) => <>{value?.name}</>,
  },
  {
    title: 'Số người dùng',
    dataIndex: 'user',
  },
  {
    title: 'Thời gian',
    dataIndex: 'duration',
    render: (value: Duration) =>
      value?.time > 0 ? (
        <>
          {value?.time > 10 ? '' : '0'}
          {value?.time} tháng
        </>
      ) : (
        <>Vô thời hạn</>
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
      <>{value?.price.toLocaleString('it-IT')}₫</>
    ),
  },
];

export const columnTablesUserVIP: ColumnsType<ItemType> = [
  {
    title: 'Người dùng',
    dataIndex: 'userId',
    render: (userId: number) => <UserInfo id={userId} />,
  },
  {
    title: 'Gói',
    dataIndex: 'subscription',
    render: (subscription: VIPPackageUserInfo) => (
      <div>{subscription.subscriptionType.name}</div>
    ),
  },
  {
    title: 'Ngày đăng ký',
    dataIndex: 'startedAt',
    render: (startedAt: string) => (
      <div>{dayjs(startedAt).format('DD/MM/YYYY')}</div>
    ),
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'subscription',
    render: (subscription: VIPPackageUserInfo) => (
      <div>{dayjs(subscription.closeAt).format('DD/MM/YYYY')}</div>
    ),
  },
];
