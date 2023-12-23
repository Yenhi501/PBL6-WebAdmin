import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { ActorDirector } from '../../model/director-actor';
import moment from 'moment';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { endpointServer } from '../../utils/endpoint';

export type FormAddEditDA = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props?: any) => void;
  editItem?: ActorDirector | null;
  people?: 'actor' | 'director';
  resetDataTable?: (props?: any) => void;
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
  handleCancel = () => {},
  people = 'actor',
  resetDataTable = () => {},
}: FormAddEditDA) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const setEditItemValue = (editItem: ActorDirector) => {
    form.setFieldsValue({
      name: editItem.name,
      dateOfBirth: moment(editItem.dateOfBirth),
      gender: editItem.gender,
    });
  };
  const urlQueryMap: Record<string, string> = {
    actor: `${endpointServer}/individuals/actors`,
    director: `${endpointServer}/individuals/directors`,
  };

  const addEditDA = (data: FieldType) => {
    setIsLoading(true);
    axios({
      method: isEditForm === true ? 'PUT' : 'POST',
      url: `${urlQueryMap[people]}${
        editItem != null ? `/${editItem[`${people}Id`]}` : ''
      }`,
      data: { ...data, description: '' },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        handleCancel();
        resetDataTable();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    form.resetFields();
    setIsLoading(false);
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
      <Spin
        indicator={<LoadingOutlined rev={''} style={{ fontSize: 24 }} spin />}
        spinning={isLoading}
      >
        <Form
          form={form}
          name="VIP-package"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          className="form-add-edit-VIP-package"
          onFinish={(values: FieldType) => {
            addEditDA(values);
          }}
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
                <DatePicker format={'DD-MM-YYYY'} />
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
                  <Option value="Male">Nam</Option>
                  <Option value="Female">Nữ</Option>
                  <Option value="Other">Khác</Option>
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
                Khôi phục
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                {isEditForm === true ? 'Cập nhật' : 'Thêm'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};
