import { ColumnsType } from 'antd/es/table';
import { ItemType } from '../../table';
import { UserInfo } from '../../userInfo';
import { Tag } from 'antd';
import moment from 'moment';

export const columns: ColumnsType<ItemType> = [
  {
    title: 'ID',
    dataIndex: 'paymentId',
    width: '7%',
    render: (value) => <>{value}</>,
  },
  {
    title: 'Người dùng',
    dataIndex: 'userId',
    width: '20%',
    render: (userId: number) => {
      return <UserInfo id={userId} />;
    },
  },
  {
    title: 'Ngày',
    dataIndex: 'createdAt',
    width: '10%',
    render: (createdAt: string) => (
      <>{moment(createdAt).format('DD/MM/YYYY')}</>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: '15%',
    render: (status: string) => {
      let color = '';
      let content = '';
      switch (status.toLowerCase()) {
        case 'completed':
          color = 'green';
          content = 'Hoàn thành';
          break;
        case 'not checkout':
          content = 'Chưa hoàn thành';
          color = 'red';
          break;
        case 'pending':
          color = 'orange';
          break;
        default:
          break;
      }
      return <Tag color={color}>{content}</Tag>;
    },
  },
  {
    title: 'Phương thức thanh toán',
    dataIndex: 'type',
    width: '13%',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'price',
    width: '12%',
    render: (price: number) => <>{price.toLocaleString('it-IT')}</>,
  },
];
