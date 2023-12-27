import { Button, Col, Form, Input, Row, Spin, notification } from 'antd';
import React, { useState } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { endpointServer } from '../../utils/endpoint';
import { MailOutlined } from '@ant-design/icons';

type FieldType = {
  email?: string;
};

const messageMap: Record<string, string> = {
  success: 'Thành công',
  error: 'Lỗi',
};

const descMap: Record<string, string> = {
  success:
    'Thư khôi phục đã được gửi, vui lòng truy cập email để tiến hành khôi phục tài khoản.',
  error: 'Email không tồn tại, vui lòng thử lại.',
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type FormEmail = { className?: string };
export const FormEmail = ({ className }: FormEmail) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType) => {
    api[type]({
      message: messageMap[type],
      placement: 'top',
      description: descMap[type],
    });
  };

  const onSendEmail = (valuesForm: FieldType) => {
    setIsLoading(true);
    const data = {
      email: valuesForm.email,
    };
    axios
      .post(`${endpointServer}/auth/email`, data, {
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
    <div className={`container-email-form ${className}`}>
      {contextHolder}
      <Spin spinning={isLoading}>
        <h2 className="form-email-heading">Khôi phục tài khoản</h2>
        <Form
          form={form}
          name="form-email"
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          onFinish={(valuesForm) => onSendEmail(valuesForm)}
          autoComplete="off"
          className="form-email"
        >
          <Row align={'middle'} className="form-email-field-container">
            <Col span={2}>
              <MailOutlined rev={''} className="email-form-icon" />
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

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="email-form-btn-submit"
            >
              Gửi thư khôi phục
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};
