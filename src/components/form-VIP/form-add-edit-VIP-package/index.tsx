import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { ItemVIPPackage } from '../../../pages/Item';
import { VIPPackageInfo } from '../../../model/VIPPackage-info';

export type FormAddEditVIPPackage = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props: any) => void;
  editItem?: VIPPackageInfo | null;
};

const { Option } = Select;

type FieldType = {
  name?: string;
  time?: string;
  status?: string;
  price?: number;
  discount?: number;
};

export const FormAddEditVIPPackage = ({
  isOpen,
  isEditForm = false,
  editItem = null,
  handleCancel,
}: FormAddEditVIPPackage) => {
  const [form] = useForm();

  const setEditItemValue = (editItem: VIPPackageInfo) => {
    form.setFieldsValue({
      name: editItem.subscriptionType.name,
      time: editItem.duration.time,
      price: editItem.subscriptionType.price,
      discount: editItem.discount,
    });
  };

  useEffect(() => {
    form.resetFields();
    if (editItem != null) {
      setEditItemValue(editItem);
    }
  }, [isOpen]);

  return (
    <Modal
      title={isEditForm === true ? 'Edit VIP Package' : 'Add VIP Package'}
      open={isOpen}
      footer={() => <></>}
      className="modal-VIP-package"
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="VIP-package"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        className="form-add-edit-VIP-package"
        onFinish={(values: ItemVIPPackage) => {}}
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Row>
          <Col span={10}>
            <Form.Item<FieldType>
              label="Time"
              name="time"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={10} offset={4}>
            <Form.Item<FieldType>
              label="Status"
              name="status"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Select>
                <Option value="active">Active</Option>
                <Option value="pending">Pending</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Discount"
          name="discount"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Row justify={'end'} gutter={16}>
          <Col>
            <Button
              type="default"
              onClick={() =>
                editItem != null
                  ? setEditItemValue(editItem)
                  : form.resetFields()
              }
            >
              Reset
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {isEditForm === true ? 'Save' : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
