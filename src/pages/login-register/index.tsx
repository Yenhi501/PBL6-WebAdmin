import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { FormLogin } from '../../components/form-login';
import './index.scss';
import { FormRegister } from '../../components/form-register';
import { FormEmail } from '../../components/form-email';
import { FormResetPassword } from '../../components/form-reset-password';

export const LoginRegisterPage = () => {
  return (
    <div className="container-login-register">
      <Routes>
        <Route path="/" element={<FormLogin className="form-content" />} />
        <Route
          path="/register"
          element={<FormRegister className="form-content" />}
        />
        <Route path="/email" element={<FormEmail className="form-content" />} />
        <Route
          path="/reset-password"
          element={<FormResetPassword className="form-content" />}
        />
      </Routes>

      <img
        src={process.env.PUBLIC_URL + '/bg-login-register.jpg'}
        alt=""
        className="login-register-bg"
      />
      <div className="login-register-mask"></div>
    </div>
  );
};
