import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { ActorDirector } from '../../model/director-actor';
import moment from 'moment';

export type FormAddEditDA = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props: any) => void;
  editItem?: ActorDirector | null;
};

const { Option } = Select;

type FieldType = {
  name?: string;
  dateOfBirth?: string;
  gender?: string;
};

export const FormAddEditDA = ({
  isOpen,
  isEditForm = false,
  editItem = null,
  handleCancel,
}: FormAddEditDA) => {
  const [form] = useForm();

  const setEditItemValue = (editItem: ActorDirector) => {
    form.setFieldsValue({
      name: editItem.name,
      dateOfBirth: moment(editItem.dateOfBirth),
      gender: editItem.gender,
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
        onFinish={(values: ActorDirector) => {}}
      >
        <Form.Item<FieldType>
          label="Tên"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Row>
          <Col span={10}>
            <Form.Item<FieldType>
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker />
            </Form.Item>
          </Col>

          <Col span={10} offset={4}>
            <Form.Item<FieldType>
              label="Giới tính"
              name="gender"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Select>
                <Option value="user">Nam</Option>
                <Option value="VIPUser">Nữ</Option>
                <Option value="admin">Khác</Option>
              </Select>
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
