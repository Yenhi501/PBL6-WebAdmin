import React, { useEffect, useState } from 'react';
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import './index.scss';
import { DeleteOutlined } from '@ant-design/icons';
import { ItemColumn, ItemVIPPackage } from '../../pages/dashboard/Item';
import { ItemMovies } from '../../pages/movies';

type ItemType = ItemVIPPackage | ItemMovies;
export interface ItemTable {
  originData: ItemType[];
  columns: Array<ItemColumn>;
  needOperationColumn: boolean;
  onEdit: (record: ItemType | null) => void;
}
export const TableResult = ({
  originData,
  columns,
  needOperationColumn,
  onEdit,
}: ItemTable) => {
  const [editButtonRefs, setEditButtonRefs] = useState<{
    [key: string]: React.RefObject<HTMLAnchorElement | null>;
  }>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [form] = Form.useForm();
  const [data, setData] = useState<ItemType[]>(originData);

  //chia page
  const [paginationConfig, setPaginationConfig] = useState({
    defaultPageSize: 8,
    total: originData.length,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState(
    data.slice(0, paginationConfig.defaultPageSize),
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * paginationConfig.defaultPageSize;
    const endIndex = startIndex + paginationConfig.defaultPageSize;
    const newCurrentPageData = data.slice(startIndex, endIndex);
    setCurrentPageData(newCurrentPageData);
  };

  const handleDelete = (key: React.Key) => {
    console.log(key);
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    console.log(newData);

    setPaginationConfig({
      ...paginationConfig,
      total: newData.length,
    });
  };
  const handleDeleteAll = (selectedRowKeys: React.Key[]) => {
    console.log(selectedRowKeys);
    const newData = data.filter(
      (items) => !selectedRowKeys.includes(items.key),
    );
    setData(newData);
    console.log(newData);
    setPaginationConfig({
      ...paginationConfig,
      total: newData.length,
    });
  };
  //edit
  const handleEdit = (record: ItemVIPPackage | ItemMovies) => {
    onEdit(record);
  };

  if (needOperationColumn) {
    columns = [
      ...columns,
      {
        title: 'Operation',
        dataIndex: 'operation',
        width: '17%',
        render: (_: any, record: ItemVIPPackage | ItemMovies) => {
          return (
            <span className="btn-operation">
              <Typography.Link
                onClick={() => handleEdit(record)}
                style={{ marginRight: -20, color: 'green' }}
                ref={(button) => {
                  editButtonRefs[record.key] = {
                    current: button,
                  } as React.RefObject<HTMLAnchorElement | null>;
                }}
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
  }

  const mergedColumns = columns.map((col: any) => {
    return col;
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
      <Table<ItemType>
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        onRow={(record) => ({
          onClick: (event) => {
            if (editButtonRefs[record.key]?.current === event.target) {
              handleEdit(record);
            }
          },
        })}
        pagination={
          paginationConfig.total > paginationConfig.defaultPageSize
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
