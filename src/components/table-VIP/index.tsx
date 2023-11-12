import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { Search } from '../search';
import { ItemTable, TableResult } from '../table';

export type TableVIPPackage = {
  onSearch?: (props: any) => void;
  onNewBtnClick?: (props: any) => void;
  onDelBtnClick?: (props: any) => void;
};
export const TableVIPPackage = ({
  originData,
  columns,
  onSearch,
  onNewBtnClick,
  onDelBtnClick,
  onEdit,
}: TableVIPPackage & ItemTable) => {
  const [tableKey, setTableKey] = useState(0);

  return (
    <>
      <div className="search-bar">
        <Search />
      </div>
      <Button
        type="primary"
        size="large"
        className="btn-new"
        onClick={onNewBtnClick}
        icon={<PlusOutlined rev="" />}
      >
        New Item
      </Button>
      <TableResult
        key={tableKey}
        originData={originData}
        columns={columns}
        needOperationColumn={true}
        onEdit={onEdit}
      />
    </>
  );
};
