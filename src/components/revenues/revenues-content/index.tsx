import { DatePicker, Form, Input, Modal, Select, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { ItemRevenues } from '../../../pages/Item';
import { ItemType, TableResult } from '../../table';
import { UserInfo } from '../../userInfo';
import './index.scss';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);

dayjs.extend(isSameOrBefore);
interface RevenuesContentProps {
  selectedContent: 'VIP' | 'ADS';
  selectedView: 'Week' | 'Month';
  selectedDateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null];
}

const dataOriginWeek: Array<ItemRevenues> = [
  {
    key: 1,
    id: 'VM01',
    date: '01/01/2021',
    status: 'Active',
    payment: 'Paypal',
    money: '50 VNĐ',
  },
  {
    key: 14,
    id: 'VM02',
    date: '01/01/2021',
    status: 'Active',
    payment: 'Momo',
    money: '80 VNĐ',
  },
  {
    key: 1222,
    id: 'VM04',
    date: '01/01/2021',
    status: 'Inactive',
    payment: 'Paypal',
    money: '350 VNĐ',
  },
  {
    key: 3,
    id: 'VM03',
    date: '01/01/2021',
    status: 'Pending',
    payment: 'Momo',
    money: '50 VNĐ',
  },

  {
    key: 145,
    id: 'VM05',
    date: '01/01/2021',
    status: 'Active',
    payment: 'Paypal',
    money: '50 VNĐ',
  },
  {
    key: 16,
    id: 'VM06',
    date: '01/01/2021',
    status: 'Pending',
    payment: 'Paypal',
    money: '250 VNĐ',
  },
  {
    key: 341,
    id: 'VM11',
    date: '01/01/2021',
    status: 'Pending',
    payment: 'Paypal',
    money: '150 VNĐ',
  },
  {
    key: 21,
    id: 'VM12',
    date: '01/01/2021',
    status: 'Inactive',
    payment: 'Paypal',
    money: '100 VNĐ',
  },
  {
    key: 121,
    id: 'VM13',
    date: '01/01/2021',
    status: 'Pending',
    payment: 'Paypal',
    money: '90 VNĐ',
  },
  {
    key: 122,
    id: 'VM14',
    date: '01/01/2021',
    status: 'Inactive',
    payment: 'Paypal',
    money: '330 VNĐ',
  },
  {
    key: 12,
    id: 'VM21',
    date: '01/01/2021',
    status: 'Active',
    payment: 'Paypal',
    money: '50 VNĐ',
  },
  {
    key: 13,
    id: 'VM31',
    date: '01/01/2021',
    status: 'Active',
    payment: 'Paypal',
    money: '50 VNĐ',
  },
];

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    render: (id: string) => <UserInfo id={id} />,
    width: '20%',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: '20%',
  },
  {
    title: 'Status',
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
    title: 'Payment method',
    dataIndex: 'payment',
    width: '15%',
  },
  {
    title: 'Money',
    dataIndex: 'money',
    width: '10%',
  },
];

export const RevenuesContent: React.FC<RevenuesContentProps> = ({
  selectedContent,
  selectedView,
  selectedDateRange,
}) => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [editedItem, setEditedItem] = useState<ItemRevenues | null>(null);
  const [data, setData] = useState<Array<ItemRevenues>>(dataOriginWeek);
  const handleOk = () => {
    if (editedItem) {
      const updatedData = data.map((item) => {
        if (item.key === editedItem.key) {
          return editedItem;
        }
        return item;
      });
      setData(updatedData);
      setTableKey((prevKey) => prevKey + 1);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // useEffect(() => {
  //   const filteredData = dataOriginWeek.filter((item) => {
  //     const itemDate = dayjs(item.date, 'DD/MM/YYYY');
  //     const startDate = selectedDateRange[0];
  //     const endDate = selectedDateRange[1];

  //     return startDate && endDate
  //       ? itemDate.isSameOrAfter(startDate, 'day') &&
  //           itemDate.isSameOrBefore(endDate, 'day')
  //       : true;
  //   });

  //   setData(filteredData);
  // }, [selectedDateRange]);

  return (
    <div className="content">
      {selectedContent === 'VIP' && selectedView === 'Week' && (
        <TableResult
          key={tableKey}
          originData={data}
          columns={columns}
          needOperationColumn={true}
          onEdit={(record: ItemType | null) => {
            setSelectedItem(record);
            setEditedItem(record ? ({ ...record } as ItemRevenues) : null);
            setIsModalOpen(true);
          }}
        />
      )}
      {selectedContent === 'VIP' && selectedView === 'Month' && <div>hihi</div>}

      <Modal
        title="Edit user revenues"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal-revenues"
      >
        {selectedItem && (
          <Form
            form={form}
            style={{ width: '400px' }}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label="Payment method">
              <Input
                value={(editedItem && editedItem.payment) || ''}
                onChange={(e) => {
                  if (editedItem) {
                    setEditedItem({
                      ...editedItem,
                      payment: e.target.value,
                    });
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="Date">
              <DatePicker
                value={dayjs((editedItem && editedItem.date) || '').startOf(
                  'day',
                )}
                onChange={(date, dateString) => {
                  if (editedItem) {
                    setEditedItem({ ...editedItem, date: dateString });
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="Status">
              <Select
                value={(editedItem && editedItem.status) || ''}
                onChange={(value) => {
                  if (editedItem) {
                    setEditedItem({ ...editedItem, status: value });
                  }
                }}
              >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};
