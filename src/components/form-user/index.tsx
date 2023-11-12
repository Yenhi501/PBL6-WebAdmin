import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import { User } from '../../model/user';

export type FormAddEditUser = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props: any) => void;
  editItem?: User | null;
};

const { Option } = Select;

type FieldType = {
  id?: string;
  email?: string;
  role?: string;
  status?: string;
  currentPassword?: string;
  newPassword?: string;
};

export const FormAddEditUser = ({
  isOpen,
  isEditForm = false,
  editItem = null,
  handleCancel,
}: FormAddEditUser) => {
  const [form] = useForm();

  const setEditItemValue = (editItem: User) => {
    form.setFieldsValue({
      id: editItem.id,
      role: editItem.role,
      status: editItem.status,
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
        onFinish={(values: User) => {}}
      >
        <Form.Item<FieldType>
          label="Username"
          name="id"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input disabled={isEditForm} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
          hidden={isEditForm}
        >
          <Input />
        </Form.Item>
        <Row>
          <Col span={10}>
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
                <Option value="ban">Ban</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={10} offset={4}>
            <Form.Item<FieldType>
              label="Role"
              name="role"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Select>
                <Option value="user">User</Option>
                <Option value="VIPUser">VIP User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item<FieldType>
              label="Current password"
              name="currentPassword"
              wrapperCol={{ span: 24 }}
            >
              <Input.Password />
            </Form.Item>
          </Col>

          <Col span={10} offset={4}>
            <Form.Item<FieldType>
              label="New password"
              name="newPassword"
              wrapperCol={{ span: 24 }}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
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
