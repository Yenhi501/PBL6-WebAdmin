import { Button, Checkbox, Col, Form, FormProps, Input, Row, Spin } from 'antd';
import React, { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { RuleObject } from 'antd/es/form';
import axios from 'axios';
import { endpointServer } from '../../utils/endpoint';
import Cookies from 'js-cookie';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export type FormLogin = { className?: string };
export const FormLogin = ({ className }: FormLogin) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  const onLogin = (valuesForm: FieldType) => {
    setIsLoading(true);
    const data = {
      username: valuesForm.username,
      password: valuesForm.password,
    };
    axios
      .post(`${endpointServer}/auth/login-admin`, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        let accessToken = JSON.stringify(res.data.result.token.accessToken);
        let refreshToken = JSON.stringify(res.data.result.token.refreshToken);
        Cookies.set('accessToken', accessToken, { expires: 1 });
        Cookies.set('refreshToken', refreshToken, { expires: 1 });

        navigator({
          pathname: `/userId/movies`,
        });

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={`container-login-form ${className}`}>
      <Spin spinning={isLoading}>
        <h2 className="form-login-heading">Đăng nhập</h2>
        <Form
          form={form}
          name="form-login"
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          onFinish={(valuesForm) => onLogin(valuesForm)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="form-login"
        >
          <Row align={'middle'} className="form-login-field-container">
            <Col span={2}>
              <UserOutlined rev={''} className="login-form-icon" />
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
          <Row align={'middle'} className="form-login-field-container">
            <Col span={2}>
              <LockOutlined rev={''} className="login-form-icon" />
            </Col>
            <Col span={22}>
              <Form.Item<FieldType>
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<FieldType> name="remember" wrapperCol={{ span: 24 }}>
            <Checkbox>
              <span className="login-form-sub-text">Nhớ đăng nhập</span>
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            {/* <Link to="/userId/movies" style={{ color: 'black' }}> */}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-btn-submit"
            >
              Đăng nhập
            </Button>
            <Link to="/email" className="login-form-link forgot-password-link">
              Quên mật khẩu?
            </Link>
          </Form.Item>
        </Form>
        <div className="form-login-sub-section"></div>
      </Spin>
    </div>
  );
};
