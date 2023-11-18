import { TabsProps, Tag } from 'antd';
import { UserInfo } from '../../components/userInfo';
import { ItemColumn } from '../Item';

export const columnTables = [
  {
    title: 'Tên',
    dataIndex: 'id',
    render: (idUser: string) => <UserInfo id={idUser} isShowEmail />,
    width: '30%',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'dateOfBirth',
    render: (idPackage: string) => <div>{idPackage}</div>,
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
  },
  {
    title: 'Số phim',
    dataIndex: 'amountOfFilm',
  },
];
