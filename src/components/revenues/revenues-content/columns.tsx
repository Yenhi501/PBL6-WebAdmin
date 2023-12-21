import { ColumnsType } from 'antd/es/table';
import { ItemType } from '../../table';
import { UserInfo } from '../../userInfo';
import { Tag } from 'antd';
import moment from 'moment';

export const columns: ColumnsType<ItemType> = [
  {
    title: 'STT',
    dataIndex: 'key',
    width: '7%',
    render: (value) => <>{Number(value) >= 10 ? value : '0' + value}</>,
  },
  {
    title: 'Người dùng',
    dataIndex: 'orderInfo',
    width: '20%',
    render: (orderInfo: string) => {
      let userId = '0';
      if (orderInfo != null) {
        userId = orderInfo?.split(' ')[0]?.split('_')[1];
      }
      console.log(userId);

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