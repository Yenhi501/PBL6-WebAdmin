import { Button, Col, Form, Input, Row, Spin, notification } from 'antd';
import React, { useState } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { endpointServer } from '../../utils/endpoint';
import { LockOutlined, BlockOutlined } from '@ant-design/icons';
import { BtnNotify } from '../btn-notify';
import './index.scss';

type FieldType = {
  password?: string;
  confirmPassword?: string;
};

const messageMap: Record<string, string> = {
  success: 'Thành công',
  error: 'Lỗi',
};

const descMap: Record<string, string> = {
  success: 'Mật khẩu đã được cập nhật, vui lòng đăng nhập lại!',
  error: 'Thay đổi không thành công, vui lòng thử lại!',
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type FormResetPassword = { className?: string };
export const FormResetPassword = ({ className }: FormResetPassword) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigator = useNavigate();

  const openNotification = (type: NotificationType) => {
    api[type]({
      message: messageMap[type],
      placement: 'top',
      description: descMap[type],
      btn: (
        <BtnNotify
          isHideCancel
          onOk={() => navigator({ pathname: '/' })}
          btnOkText="Đến trang đăng nhập"
        />
      ),
    });
  };

  const onResetPassword = (valuesForm: FieldType) => {
    setIsLoading(true);
    const data = {
      password: valuesForm.password,
    };
    axios
      .post(`${endpointServer}/auth/reset-password`, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        openNotification('success');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        openNotification('error');
        setIsLoading(false);
      });
  };

  return (
    <div className={`container-reset-password-form ${className}`}>
      {contextHolder}
      <Spin spinning={isLoading}>
        <h2 className="form-reset-password-heading">Cập nhật mật khẩu</h2>
        <Form
          form={form}
          name="form-reset-password"
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          onFinish={(valuesForm) => onResetPassword(valuesForm)}
          autoComplete="off"
          className="form-reset-password"
        >
          <Row align={'middle'} className="form-reset-password-field-container">
            <Col span={2}>
              <LockOutlined rev={''} className="reset-password-form-icon" />
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
          <Row align={'middle'} className="form-reset-password-field-container">
            <Col span={2}>
              <BlockOutlined rev={''} className="reset-password-form-icon" />
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

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="reset-password-form-btn-submit"
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};
