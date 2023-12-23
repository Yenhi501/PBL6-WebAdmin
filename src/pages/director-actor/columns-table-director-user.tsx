import { TabsProps } from 'antd';
import { UserInfo } from '../../components/userInfo';
import moment from 'moment';

export const getColumnTables = (people: 'actor' | 'director') => {
  return [
    { title: 'ID', dataIndex: `${people}Id` },
    {
      title: 'Tên diễn viên',
      dataIndex: `${people}Id`,
      render: (id: string) => {
        return <UserInfo id={id} isShowEmail={false} people={people} />;
      },
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      render: (dateOfBirth: string) => (
        <>{moment(dateOfBirth).format('DD-MM-YYYY')}</>
      ),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
    },
  ];
};

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

export const itemTabs: TabsProps['items'] = [
  {
    key: '1',
    label: 'Diễn viên',
  },
  {
    key: '2',
    label: 'Đạo diễn',
  },
];
