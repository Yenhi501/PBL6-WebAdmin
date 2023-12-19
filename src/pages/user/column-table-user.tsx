import { Tag } from 'antd';
import { UserInfo } from '../../components/userInfo';
import { ColumnsType } from 'antd/es/table';
import { ItemType } from '../../components/table';
import moment from 'moment';

export const roleMap: Record<number, string> = {
  0: 'Chủ',
  1: 'Quản lý',
  2: 'Người dùng',
};

export const columnTableUser: ColumnsType<ItemType> = [
  {
    title: 'STT',
    dataIndex: 'key',
    render: (value) => <>{Number(value) >= 10 ? value : '0' + value}</>,
  },
  {
    title: 'Người dùng',
    dataIndex: 'userId',
    render: (idUser: number) => <UserInfo id={idUser} />,
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
  {
    title: 'Ngày tham gia',
    dataIndex: 'createdAt',
    render: (createdAt: string) => (
      <>{moment(createdAt).format('DD-MM-YYYY')}</>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'active',
    render: (active: boolean) => {
      let color = '';
      switch (active) {
        case true:
          color = 'green';
          break;
        case false:
          color = 'red';
          break;
        default:
          break;
      }
      return (
        <Tag color={color}>
          {active === true ? 'Hoạt động' : 'Chưa kích hoạt'}
        </Tag>
      );
    },
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    render: (role: number) => <>{roleMap[role]}</>,
  },
];
