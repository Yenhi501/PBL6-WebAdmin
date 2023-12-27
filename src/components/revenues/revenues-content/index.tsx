import { Button, DatePicker, Form, Input, Modal, Select, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { ItemType, TableResult } from '../../table';
import './index.scss';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { columns } from './columns';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import { endpointServer } from '../../../utils/endpoint';
import { DataRawPayment } from '../../../model/revenue';
import { FormRevenue } from '../../form-revenue';
dayjs.extend(isSameOrAfter);

dayjs.extend(isSameOrBefore);
interface RevenuesContentProps {
  selectedContent: 'VIP' | 'ADS';
  selectedView: 'Week' | 'Month';
  selectedDateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null];
}

export const RevenuesContent: React.FC<RevenuesContentProps> = ({
  selectedContent,
  selectedView,
  selectedDateRange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [editedItem, setEditedItem] = useState<DataRawPayment | null>(null);
  const [data, setData] = useState<Array<DataRawPayment>>([]);
  const [resetData, setResetData] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
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

  const getDataRevenue = (searchValue?: string) => {
    const defaultParams = {
      page: currPage,
      pageSize: 5,
    };
    axios
      .get(
        `${endpointServer}/payments?startDate=${dayjs(
          selectedDateRange[0],
        ).format('YYYY-MM-DD')}&endDate=${dayjs(selectedDateRange[1]).format(
          'YYYY-MM-DD',
        )}`,
        {
          headers: { 'Content-Type': 'application/json' },
          params:
            searchValue != null
              ? { search: searchValue, ...defaultParams }
              : defaultParams,
        },
      )
      .then((res) => {
        const dataRevenue = res.data.data;
        setTotalItems(res.data.totalCount);
        dataRevenue.forEach(
          (payment: DataRawPayment, index: number) => (payment.key = index + 1),
        );
        setData(dataRevenue);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDataRevenue();
  }, [resetData, selectedDateRange[0], selectedDateRange[1], currPage]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="content">
      <FormRevenue
        isOpen={isModalOpen}
        handleCancel={() => {
          setIsModalOpen(false);
          setEditedItem(null);
        }}
        editItem={editedItem}
      />
      <div className="search-bar">
        <Search
          placeholder="Nhập thông tin tìm kiếm"
          onSearch={(e) => getDataRevenue(e)}
          allowClear
        />
        <Button onClick={() => setResetData((prev) => prev + 1)}>
          Làm mới
        </Button>
      </div>
      {selectedContent === 'VIP' && selectedView === 'Week' && (
        <TableResult
          key={tableKey}
          originData={data}
          columns={columns}
          needOperationColumn={true}
          onEdit={(record: ItemType | null) => {
            setSelectedItem(record);
            setEditedItem(record ? ({ ...record } as DataRawPayment) : null);
            setIsModalOpen(true);
          }}
          onChangePagination={(e) => setCurrPage(e)}
          totalData={totalItems}
          isHideCreate={true}
        />
      )}
    </div>
  );
};
