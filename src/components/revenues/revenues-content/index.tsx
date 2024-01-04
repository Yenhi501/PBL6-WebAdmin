import { Button, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import React, { useEffect, useState } from 'react';
import { useToken } from '../../../hooks/useToken';
import { DataRawPayment } from '../../../model/revenue';
import { endpointServer } from '../../../utils/endpoint';
import { FormRevenue } from '../../form-revenue';
import { ItemType, TableResult } from '../../table';
import { columns } from './columns';
import './index.scss';
dayjs.extend(isSameOrAfter);

dayjs.extend(isSameOrBefore);
interface RevenuesContentProps {
  selectedDateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null];
}

export const RevenuesContent: React.FC<RevenuesContentProps> = ({
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
  const { accessToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);

  const getDataRevenue = (searchValue?: string) => {
    setIsLoading(true); //
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
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
          params:
            searchValue != null
              ? { search: searchValue, ...defaultParams }
              : defaultParams,
        },
      )
      .then((res) => {
        setIsLoading(false);
        const dataRevenue = res.data.data;
        setTotalItems(res.data.totalCount);
        dataRevenue.forEach((payment: DataRawPayment, index: number) => {
          payment.key = index + 1;
          if (payment.orderInfo != null) {
            payment.userId = Number(payment.orderInfo?.split(' ')[1]);
          }
        });

        setData(dataRevenue);
      })

      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDataRevenue();
  }, [resetData, selectedDateRange[0], selectedDateRange[1], currPage]);

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
      <Spin spinning={isLoading}>
        <TableResult
          key={tableKey}
          originData={data}
          columns={columns}
          needOperationColumn={false}
          onEdit={(record: ItemType | null) => {
            setSelectedItem(record);
            setEditedItem(record ? ({ ...record } as DataRawPayment) : null);
            setIsModalOpen(true);
          }}
          onChangePagination={(e) => setCurrPage(e)}
          totalData={totalItems}
          isHideCreate={true}
        />
      </Spin>
    </div>
  );
};
