import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { VIPUser } from '../../../model/VIPUser';
import moment from 'moment';

export type FormAddEditVIPUser = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props: any) => void;
  editItem?: VIPUser | null;
};

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

type FieldType = {
  id?: string;
  idPackage?: string;
  dateRegistered?: string;
  durationPackage?: number;
};

export const FormAddEditVIPUser = ({
  isOpen,
  isEditForm = false,
  editItem = null,
  handleCancel,
}: FormAddEditVIPUser) => {
  const [form] = useForm();

  const setEditItemValue = (editItem: VIPUser) => {
    form.setFieldsValue({
      id: editItem.id,
      idPackage: editItem.idPackage,
      dateRegistered: moment(editItem.dateRegistered),
      durationPackage: editItem.durationPackage,
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
        onFinish={(values: VIPUser) => {}}
      >
        <Form.Item<FieldType>
          label="Id user"
          name="id"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input disabled={isEditForm} />
        </Form.Item>

        <Row>
          <Col span={10}>
            <Form.Item<FieldType>
              label="Package"
              name="idPackage"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Select>
                <Option value="V1">VIP1</Option>
                <Option value="V2">VIP2</Option>
                <Option value="V3">VIP3</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={10} offset={4}>
            <Form.Item<FieldType>
              label="Duration"
              name="durationPackage"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Select>
                <Option value="30">1 month</Option>
                <Option value="180">6 months</Option>
                <Option value="365">1 year</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label="Date registered"
          name="dateRegistered"
          rules={[{ required: true, message: 'Please input your password!' }]}
          hidden={!isEditForm}
        >
          <DatePicker className="date-picker" format={dateFormat} />
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
