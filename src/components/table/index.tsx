import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import './index.scss';
import { VIPUser } from '../../model/VIPUser';
import { User } from '../../model/user';
import { ActorDirector } from '../../model/director-actor';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { EpisodeRaw, ItemMovieHandled } from '../../model/movie';
import { DataRawPayment } from '../../model/revenue';
import { VIPPackageInfo } from '../../model/VIPPackage-info';

export type ItemType =
  | VIPPackageInfo
  | ItemMovieHandled
  | VIPUser
  | User
  | ActorDirector
  | DataRawPayment
  | EpisodeRaw;

export interface ItemTable {
  originData: ItemType[];
  columns: ColumnsType<ItemType>;
  needOperationColumn: boolean;
  onEdit: (record: ItemType | null) => void;
  onClickRow?: (record: ItemType | null) => void;
  onAdd?: (props?: any) => void;
  totalData?: number;
  onChangePagination?: (props?: any) => void;
}
export const TableResult = ({
  originData,
  columns,
  needOperationColumn,
  onEdit,
  onClickRow = () => {},
  onAdd = () => {},
  onChangePagination = () => {},
  totalData,
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
  const [data, setData] = useState<ItemType[]>([]);

  useEffect(() => {
    setData(originData);
  }, [originData]);

  //chia page
  const [paginationConfig, setPaginationConfig] = useState({
    defaultPageSize: 8,
    total: originData.length,
  });

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
        title: 'Tiện ích',
        dataIndex: 'operation',
        width: '20vh',
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
          className="btn-new"
          icon={<PlusOutlined rev="" style={{ color: 'white' }} />}
          onClick={onAdd}
        >
          Thêm
        </Button>
        <Button
          type="primary"
          size="large"
          className="btn-delete-all "
          icon={<DeleteOutlined rev="" className="icon-delete-all" />}
          onClick={() => handleDeleteAll(selectedRowKeys)}
        >
          Xóa hàng loạt
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
        // pagination={
        //   paginationConfig.total > paginationConfig.defaultPageSize
        //     ? {
        //         ...paginationConfig,
        //         current: currentPage,
        //         onChange: handlePageChange,
        //       }
        //     : false
        // }
        pagination={{
          total: totalData,
          onChange: (e) => onChangePagination(e),
          pageSize: 5,
        }}
        scroll={{ x: 'max-content' }}
        rowSelection={{
          ...rowSelection,
        }}
      />
    </Form>
  );
};
