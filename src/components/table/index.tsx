import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import './index.scss';
import { ItemColumn, ItemVIPPackage, ItemRevenues } from '../../pages/Item';
import { ItemMovies } from '../../pages/movies';
import { VIPUser } from '../../model/VIPUser';
import { User } from '../../model/user';
import { ActorDirector } from '../../model/director-actor';
import { Episode } from '../../model/episode';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetIsEditMovies } from '../../redux/actions/movie-action';

export type ItemType =
  | ItemVIPPackage
  | ItemMovies
  | VIPUser
  | User
  | ActorDirector
  | ItemRevenues
  | Episode;

export interface ItemTable {
  originData: ItemType[];
  columns: Array<ItemColumn>;
  needOperationColumn: boolean;
  onEdit: (record: ItemType | null) => void;
  onClickRow?: (record: ItemType | null) => void;
}
export const TableResult = ({
  originData,
  columns,
  needOperationColumn,
  onEdit,
  onClickRow = () => {},
}: ItemTable) => {
  const [editButtonRefs, setEditButtonRefs] = useState<{
    [key: string]: React.RefObject<HTMLAnchorElement | null>;
  }>({});
  const [isEdit, setIsEdit] = useState(false);
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
    const newData = data.filter((item) => item.key !== key);
    setData(newData);

    setPaginationConfig({
      ...paginationConfig,
      total: newData.length,
    });
  };
  const handleDeleteAll = (selectedRowKeys: React.Key[]) => {
    const newData = data.filter(
      (items) => !selectedRowKeys.includes(items.key),
    );
    setData(newData);
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
                onClick={(event) => {
                  event.stopPropagation();
                  handleEdit(record);
                }}
                style={{ marginRight: -20, color: 'green' }}
                ref={(button) => {
                  editButtonRefs[record.key] = {
                    current: button,
                  } as React.RefObject<HTMLAnchorElement | null>;
                }}
                className="table-icon"
              >
                <EditOutlined rev="" />
              </Typography.Link>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={(event) => {
                  event?.stopPropagation();
                  handleDelete(record.key);
                }}
                onCancel={(event) => {
                  event?.stopPropagation();
                }}
                className="btn-delete"
              >
                <DeleteOutlined
                  rev=""
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className="table-icon"
                />
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
    <Form form={form} component={false} className="table-container">
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
          onClick: () => {
            onClickRow(record);
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
