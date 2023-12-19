import { ColumnsType } from 'antd/es/table';
import { ItemType } from '../../table';
import { UserInfo } from '../../userInfo';
import { Tag } from 'antd';

export const columns: ColumnsType<ItemType> = [
  { title: 'STT', dataIndex: 'key', width: '7%' },
  {
    title: 'Người dùng',
    dataIndex: 'username',
    render: (id: string) => <UserInfo id={id} />,
    width: '20%',
  },
  {
    title: 'Ngày',
    dataIndex: 'date',
    width: '10%',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: '15%',
    render: (status: string) => {
      let color = '';
      switch (status.toLowerCase()) {
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
    title: 'Phương thức thanh toán',
    dataIndex: 'payment',
    width: '20%',
  },
  {
    title: 'Số tiền',
    dataIndex: 'money',
    width: '10%',
  },
];
