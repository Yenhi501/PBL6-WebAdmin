import React, { useEffect, useState } from 'react';
import { StatusCard } from '../../components/status-card/index';
import { ItemType, TableResult } from '../../components/table/index';
import './index.scss';
import { Button, Tabs, TabsProps } from 'antd';
import { ItemVIPPackage } from '../Item';
import {
  columnTables,
  columnTablesUserVIP,
  itemTabs,
  statusCard,
} from './value-item-component';
import { FormAddEditVIPPackage } from '../../components/form-VIP/form-add-edit-VIP-package';
import { FormAddEditVIPUser } from '../../components/form-VIP/form-add-edit-VIP-user';
import { VIPUser } from '../../model/VIPUser';
import moment from 'moment';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import { endpointServer } from '../../utils/endpoint';
import { VIPPackageInfo } from '../../model/VIPPackage-info';

const urlMap: Record<string, string> = {
  '1': `${endpointServer}/subscription/get-all-subscription-type`,
  '2': '',
};

export const VIPPackages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVIPUserOpen, setIsModalVIPUserOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<VIPPackageInfo | null>(null);
  const [editedVIPUser, setEditedVIPUser] = useState<VIPUser | null>(null);
  const [resetData, setResetData] = useState(0);
  const [activeKey, setActiveKey] = useState<string>('1');
  const [data, setData] = useState<Array<VIPPackageInfo>>([]);
  const [dataVIPUser, setDataVIPUser] = useState<Array<VIPUser>>([]);

  const getDataVIPPackage = () => {
    axios({
      method: 'GET',
      url: `${endpointServer}/subscription/get-all-subscription-info`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const dataVIPPackage = res.data.data;
        dataVIPPackage.forEach(
          (item: VIPPackageInfo, index: number) => (item.key = index + 1),
        );
        setData(dataVIPPackage);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataVIPPackage();
  }, [resetData]);

  return (
    <div className="VIP-container">
      <FormAddEditVIPPackage
        isOpen={isModalOpen}
        handleCancel={() => {
          setIsModalOpen(false);
          setEditedItem(null);
        }}
        editItem={editedItem}
        isEditForm={editedItem != null ? true : false}
      />
      <FormAddEditVIPUser
        isOpen={isModalVIPUserOpen}
        handleCancel={() => {
          setIsModalVIPUserOpen(false);
          setEditedVIPUser(null);
        }}
        editItem={editedVIPUser}
        isEditForm={editedVIPUser != null ? true : false}
      />
      <h2 className="movies-header">VIP Packages</h2>
      <div className="content-container">
        <div className="status-container">
          {statusCard.map((item, index) => (
            <div className="status-item" key={index}>
              <StatusCard
                icon={item.icon}
                count={item.count}
                title={item.title}
              />
            </div>
          ))}
        </div>
        <div className="col-12">
          <div className="card__body">
            <Tabs
              activeKey={activeKey}
              items={itemTabs}
              onChange={(e) => setActiveKey(e)}
            />
            <div className="search-bar">
              <Search placeholder="Nhập tên gói" />
              <Button onClick={() => setResetData((prev) => prev + 1)}>
                Làm mới
              </Button>
            </div>
            <TableResult
              key={activeKey}
              originData={activeKey === '1' ? data : dataVIPUser}
              columns={activeKey === '1' ? columnTables : columnTablesUserVIP}
              needOperationColumn={true}
              onEdit={(record: ItemType | null) => {
                if (activeKey === '1') {
                  setEditedItem(
                    record ? ({ ...record } as VIPPackageInfo) : null,
                  );
                  setIsModalOpen(true);
                } else {
                  setEditedVIPUser(record ? ({ ...record } as VIPUser) : null);
                  setIsModalVIPUserOpen(true);
                }
              }}
              onAdd={() =>
                activeKey === '1'
                  ? setIsModalOpen(true)
                  : setIsModalVIPUserOpen(true)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
