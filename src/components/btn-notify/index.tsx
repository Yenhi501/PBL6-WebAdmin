import { Button, Space } from 'antd';
import React from 'react';
import './index.scss';

export type BtnNotify = {
  onOk?: (props?: any) => void;
  onCancel?: (props?: any) => void;
  btnOkText?: string;
  btnCancelText?: string;
  isHideCancel?: boolean;
};
export const BtnNotify = ({
  onOk,
  onCancel,
  btnOkText,
  btnCancelText,
  isHideCancel,
}: BtnNotify) => {
  return (
    <Space className="btn-notify-container">
      <Button type="link" size="small" onClick={onCancel} hidden={isHideCancel}>
        {btnCancelText || 'Hủy'}
      </Button>
      <Button type="primary" size="small" onClick={onOk} className="btn-ok">
        {btnOkText || 'Xác nhận'}
      </Button>
    </Space>
  );
};
