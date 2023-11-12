import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { ItemColumn, ItemRevenues, ItemVIPPackage } from '../../pages/Item';
import { VIPUser } from '../../pages/VIPPackages/value-item-component';
import { ItemMovies } from '../../pages/movies';
import './index.scss';
export type ItemType = ItemVIPPackage | ItemMovies | VIPUser | ItemRevenues;
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
  const handleEdit = (record: ItemType) => {
    onEdit(record);
  };

  if (needOperationColumn) {
    columns = [
      ...columns,
      {
        title: 'Operation',
        dataIndex: 'operation',
        width: '10%',
        render: (_: any, record: ItemType) => {
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
                <EditOutlined rev="" />
              </Typography.Link>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
                className="btn-delete"
              >
                <DeleteOutlined rev="" />
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
          className="btn-delete-all "
          icon={<DeleteOutlined rev="" className="icon-delete-all" />}
          onClick={() => handleDeleteAll(selectedRowKeys)}
        >
          Delete
        </Button>
      </div>
      <Table
        dataSource={data}
        bordered
        columns={mergedColumns}
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
        scroll={{ x: 'max-content' }}
        rowSelection={{
          ...rowSelection,
        }}
      />
    </Form>
  );
};
