import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Tag,
  Typography,
} from 'antd';
import './index.scss';
import { DeleteOutlined } from '@ant-design/icons';
import { ItemVIPPackage } from './Item';
import type { TableRowSelection } from 'antd/es/table/interface';

const originData: Array<ItemVIPPackage> = [
  {
    key: '1',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: '2',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'inactive',
    price: '79000 ₫',
  },
  {
    key: '3',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: '4',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: '5',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: '6',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'inactive',
    price: '79000 ₫',
  },
  {
    key: '7',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: '57',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'inactive',
    price: '79000 ₫',
  },
  {
    key: '47',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: '37',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: '27',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
  {
    key: '17',
    id: 'ID1',
    name: 'VIP1',
    user: 20,
    time: '1 tháng',
    status: 'active',
    price: '79000 ₫',
  },
];
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: ItemVIPPackage;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const paginationConfig = {
  defaultPageSize: 8,
  total: originData.length,
};
export const TableResult: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  //chia page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState(
    data.slice(0, paginationConfig.defaultPageSize),
  );

  const handlePageChange = (page: number) => {
    const startIndex = (page - 1) * paginationConfig.defaultPageSize;
    const endIndex = startIndex + paginationConfig.defaultPageSize;
    const currentPageData = data.slice(startIndex, endIndex);
    setCurrentPage(page);
    setCurrentPageData(currentPageData);
  };
  const shouldShowPagination = paginationConfig.total > 8;

  const isEditing = (record: ItemVIPPackage) => record.key === editingKey;

  const edit = (record: Partial<ItemVIPPackage> & { key: React.Key }) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as ItemVIPPackage;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };
  const handleDeleteAll = (selectedRowKeys: React.Key[]) => {
    const newData = data.filter(
      (items) => !selectedRowKeys.includes(items.key),
    );
    setData(newData);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'User',
      dataIndex: 'user',
      editable: true,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      editable: true,
      key: 'status',
      render: (_: string, { status }: { status: string }) => {
        let color;
        if (status === 'inactive') {
          color = 'volcano';
        } else {
          color = 'green';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '17%',
      render: (_: any, record: ItemVIPPackage) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="btn-operation">
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: -20, color: 'green' }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
              style={{ marginLeft: 8 }}
              className="btn-delete"
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        ) : (
          <span className="btn-operation">
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              className="btn-edit"
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
              style={{ marginLeft: 8 }}
              className="btn-delete"
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ItemVIPPackage) => ({
        record,
        inputType: col.dataIndex === 'user' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <div className="btn-action">
        <Button
          type="primary"
          size="large"
          className="btn-delete-all"
          icon={<DeleteOutlined rev="" />}
          onClick={() => handleDeleteAll(selectedRowKeys)}
        >
          Delete
        </Button>
      </div>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={
          shouldShowPagination
            ? {
                ...paginationConfig,
                current: currentPage,
                onChange: handlePageChange,
              }
            : false
        }
        rowSelection={{
          ...rowSelection,
        }}
      />
    </Form>
  );
};
