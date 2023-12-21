import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { DataRawPayment } from '../../model/revenue';

export type FormRevenue = {
  isOpen: boolean;
  handleOk?: (props?: any) => void;
  handleCancel?: (props?: any) => void;
  editItem?: DataRawPayment;
};

export type RevenueForm = {
  user: string;
};

export const FormRevenue = ({
  isOpen,
  handleOk,
  handleCancel,
  editItem,
}: FormRevenue) => {
  const [form] = useForm();

  return (
    <Modal
      title="Edit user revenues"
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-revenues"
    >
      <Form
        form={form}
        style={{ width: '400px' }}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item label="Payment method">
          <Input />
        </Form.Item>
        <Form.Item label="Date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Status">
          <Select>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
