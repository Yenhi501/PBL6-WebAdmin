import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import './index.scss';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import { User, UserAdd, UserEdit } from '../../model/user';
import axios from 'axios';
import { endpointServer } from '../../utils/endpoint';
import { useToken } from '../../hooks/useToken';

export type FormAddEditUser = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props?: any) => void;
  editItem?: User | null;
  resetDataTable?: (props?: any) => void;
};

const { Option } = Select;

type FieldType = {
  username: string;
  email: string;
  role: number;
  active: boolean;
  password: string;
  gender: string;
  dateOfBirth: string;
};

export const FormAddEditUser = ({
  isOpen,
  isEditForm = false,
  editItem = null,
  handleCancel = () => {},
  resetDataTable = () => {},
}: FormAddEditUser) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useToken();
  const setEditItemValue = (editItem: User) => {
    form.setFieldsValue({
      username: editItem.account.username,
      email: editItem.email,
      gender: editItem.gender,
      dateOfBirth: moment(editItem.dateOfBirth),
    });
  };

  const addUser = (data: FieldType) => {
    const handledData: UserAdd = {
      username: data.username,
      dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD HH:mm:ss.SSSZ'),
      email: data.email,
      gender: data.gender,
      password: data.password,
    };
    setIsLoading(true);
    axios
      .post(`${endpointServer}/user/create-user`, handledData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        handleCancel();
        resetDataTable();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const editUser = (data: FieldType) => {
    const handledData: UserEdit = {
      userId: editItem?.userId || 0,
      username: data.username,
      dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD HH:mm:ss.SSSZ'),
      email: data.email,
      gender: data.gender,
    };

    setIsLoading(true);
    axios
      .put(`${endpointServer}/user/update-user`, handledData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        handleCancel();
        resetDataTable();
      })
      .catch((err) => {
        console.log(err);
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
          name="form-add-edit-user"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          className="form-add-edit-user"
          onFinish={(values: FieldType) => {
            isEditForm === true ? editUser(values) : addUser(values);
          }}
        >
          <Form.Item<FieldType>
            label="Tên người dùng"
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tên người dùng!' },
            ]}
          >
            <Input disabled={isEditForm} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email không hợp lệ!', type: 'email' },
            ]}
          >
            <Input disabled={isEditForm} />
          </Form.Item>
          <Row>
            <Col span={10}>
              <Form.Item<FieldType> label="Giới tính" name="gender">
                <Select>
                  <Option value="Male">Nam</Option>
                  <Option value="Female">Nữ</Option>
                  <Option value="Other">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10} offset={4}>
              <Form.Item<FieldType>
                name="dateOfBirth"
                label="Ngày sinh"
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  className="date-picker"
                  placeholder="DD-MM-YYYY"
                  format={'DD-MM-YYYY'}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            wrapperCol={{ span: 24 }}
            rules={[
              { required: !isEditForm, message: 'Vui lòng nhập mật khẩu!' },
            ]}
            hidden={isEditForm}
          >
            <Input.Password />
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
