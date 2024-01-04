import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { DataRawPayment } from '../../model/revenue';
import './index.scss';
import dayjs from 'dayjs';

export type FormRevenue = {
  isOpen: boolean;
  handleOk?: (props?: any) => void;
  handleCancel?: (props?: any) => void;
  editItem?: DataRawPayment | null;
};

export type RevenueForm = {
  paymentMethod?: string;
  createAt?: string;
  id: string | number;
};

interface OptionSelects {
  label: string;
  value: number | string;
}

const optionsPaymentMethod: Array<OptionSelects> = [
  { label: 'VN Pay', value: 'VN Pay' },
  { label: 'Paypal', value: 'Paypal' },
];

export const FormRevenue = ({
  isOpen,
  handleOk,
  handleCancel,
  editItem,
}: FormRevenue) => {
  const [form] = useForm();

  const setEditItemValue = (editItem: DataRawPayment) => {
    form.setFieldsValue({
      id: editItem.paymentId,
      paymentMethod: { value: editItem?.type, label: editItem?.type },
      createAt: dayjs(editItem?.createdAt, 'YYYY-MM-DD'),
    });
  };

  useEffect(() => {
    if (editItem != null) {
      setEditItemValue(editItem);
    }
  }, []);

  return (
    <Modal
      title="Chỉnh sửa thanh toán"
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-revenues"
      footer={() => <></>}
    >
      <Form
        form={form}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={(values) => {}}
      >
        <Form.Item<RevenueForm> name="id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item<RevenueForm>
          name="paymentMethod"
          label="Phương thức thanh toán"
        >
          <Select options={optionsPaymentMethod} />
        </Form.Item>
        <Form.Item<RevenueForm> name="createAt" label="Ngày thanh toán">
          <DatePicker
            className="date-picker"
            placeholder="DD-MM-YYYY"
            format="DD-MM-YYYY"
          />
        </Form.Item>
        <Row justify={'end'} gutter={16}>
          <Col>
            <Button
              type="default"
              onClick={() =>
                editItem != null ? setEditItemValue(editItem) : ''
              }
            >
              Khôi phục
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
