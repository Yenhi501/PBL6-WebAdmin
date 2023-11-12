import { Tag } from 'antd';
import { UserInfo } from '../../components/userInfo';
import { ItemColumn } from '../Item';

export const columnTableUser: ItemColumn[] = [
  {
    title: 'Username',
    dataIndex: 'id',
    render: (idUser: string) => <UserInfo id={idUser} />,
    width: '40%',
  },
  {
    title: 'Created date',
    dataIndex: 'dateCreated',
    width: '15%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '15%',
    render: (status: string) => {
      let color = '';
      switch (status) {
        case 'Active':
          color = 'green';
          break;
        case 'Ban':
          color = 'red';
          break;
        default:
          break;
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: 'Role',
    dataIndex: 'role',
    width: '15%',
  },
];
