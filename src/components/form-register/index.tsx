import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  notification,
} from 'antd';
import React, { useState } from 'react';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  CalendarOutlined,
  BlockOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/vi_VN';

import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { RuleObject } from 'antd/es/form';
import axios from 'axios';
import { endpointServer } from '../../utils/endpoint';
import moment from 'moment';
import { BtnNotify } from '../btn-notify';
import { useToken } from '../../hooks/useToken';

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
  dateOfBirth?: string;
  gender?: string;
  remember?: string;
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const messageMap: Record<string, string> = {
  success: 'Thành công',
  error: 'Lỗi',
  info: 'Xác nhận',
};

const descMap: Record<string, string> = {
  success: 'Đăng ký tài khoản admin thành công.',
  error: 'Đăng ký tài khoản admin không thành công, vui lòng thử lại.',
  info: 'Đăng xuất tài khoản chủ và đăng nhập lại?',
};

export type FormRegister = { className?: string };
export const FormRegister = ({ className }: FormRegister) => {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigator = useNavigate();
  const { accessToken } = useToken();

  const openNotification = (type: NotificationType) => {
    api[type]({
      message: messageMap[type],
      placement: 'top',
      description: descMap[type],
      btn: (
        <BtnNotify
          isHideCancel={type !== 'info' ? true : false}
          onOk={() => {
            navigator({ pathname: '/' });
          }}
          onCancel={() => api.destroy()}
        />
      ),
    });
  };

  const onCheckboxChange = (e: any) => {
    setChecked(e.target.checked);
    form.validateFields(['remember']);
  };

  const validation = (
    rule: RuleObject,
    value: any,
    callback: (error?: string) => void,
  ) => {
    if (checked) {
      return callback();
    }
    return callback('Vui lòng đọc kỹ chính sách!');
  };

  const createAccount = (valuesForm: FieldType) => {
    setIsLoading(true);
    const data = {
      email: valuesForm.email,
      dateOfBirth: moment(valuesForm.dateOfBirth).format(
        'YYYY-MM-DD HH:mm:ss.SSSZ',
      ),
      gender: valuesForm.gender,
      username: valuesForm.username,
      password: valuesForm.password,
    };

    axios
      .post(`${endpointServer}/auth/register-admin`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((res) => {
        setIsLoading(false);
        openNotification('success');

        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
        openNotification('error');
        setIsLoading(false);
      });
  };

  return (
    <div className={`container-register-form ${className}`}>
      {contextHolder}
      <Spin spinning={isLoading}>
        <h2 className="form-register-heading">Đăng ký</h2>
        <Form
          form={form}
          name="form-register"
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          onFinish={(valuesForm) => createAccount(valuesForm)}
          autoComplete="off"
          className="form-register"
        >
          <Row align={'middle'} className="form-register-field-container">
            <Col span={2}>
              <UserOutlined rev={''} className="register-form-icon" />
            </Col>
            <Col span={22}>
              <Form.Item<FieldType>
                name="username"
                rules={[
                  { required: true, message: 'Vui lòng điền tên đăng nhập!' },
                ]}
              >
                <Input placeholder="Tên đăng nhập" width={'100%'} />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'} className="form-register-field-container">
            <Col span={2}>
              <MailOutlined rev={''} className="register-form-icon" />
            </Col>
            <Col span={22}>
              <Form.Item<FieldType>
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đúng email!',
                    type: 'email',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'} className="form-register-field-container">
            <Col span={2}>
              <LockOutlined rev={''} className="register-form-icon" />
            </Col>
            <Col span={22}>
              <Form.Item<FieldType>
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'} className="form-register-field-container">
            <Col span={2}>
              <BlockOutlined rev={''} className="register-form-icon" />
            </Col>
            <Col span={22}>
              <Form.Item<FieldType>
                name="confirmPassword"
                rules={[
                  { required: true, message: 'Xác nhận mật khẩu không đúng!' },
                ]}
              >
                <Input.Password placeholder="Xác nhận mật khẩu" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="form-register-field-container">
            <Col span={12}>
              <Row align={'middle'}>
                <Col span={4}>
                  <CalendarOutlined rev={''} className="register-form-icon" />
                </Col>
                <Col span={20}>
                  <Form.Item<FieldType>
                    name="dateOfBirth"
                    rules={[{ required: true, message: 'Chọn ngày sinh!' }]}
                  >
                    <DatePicker
                      placeholder="Ngày sinh"
                      format="DD-MM-YYYY"
                      locale={locale}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={11} offset={1}>
              <Row align={'middle'}>
                <Col span={4}>
                  <TeamOutlined rev={''} className="register-form-icon" />
                </Col>
                <Col span={20}>
                  <Form.Item<FieldType>
                    name="gender"
                    rules={[{ required: true, message: 'Chọn giới tính!' }]}
                  >
                    <Select
                      placeholder="Giới tính"
                      options={[
                        { label: 'Nam', value: 'male' },
                        { label: 'Nữ', value: 'female' },
                        { label: 'Khác', value: 'other' },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item<FieldType>
            name="remember"
            wrapperCol={{ span: 24 }}
            rules={[{ validator: validation }]}
          >
            <Checkbox onChange={onCheckboxChange} value={checked}>
              <span className="register-form-sub-text">
                Tôi đã đọc kỹ{' '}
                <a href="" className="register-form-link">
                  chính sách người dùng
                </a>
              </span>
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-btn-submit"
            >
              Đăng ký
            </Button>
            <Link to={'/userId/movies'}>
              <Button type="default" className="register-form-btn-submit">
                Trở lại
              </Button>
            </Link>
          </Form.Item>
        </Form>
        <div className="form-register-sub-section">
          Đã có tài khoản?&nbsp;
          <a
            className="register-form-link"
            onClick={() => openNotification('info')}
          >
            Đang nhập ngay
          </a>
        </div>
      </Spin>
    </div>
  );
};
