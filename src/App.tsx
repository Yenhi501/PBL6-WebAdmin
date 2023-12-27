import React from 'react';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/theme.css';
import './assets/css/index.css';
import { LayoutAdmin as Layout } from './pages/Layout/index';
import './index.scss';
import { Route, Routes } from 'react-router';
import { LoginRegisterPage } from './pages/login-register';

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<LoginRegisterPage />} />
      <Route path="/userId/*" element={<Layout />} />
    </Routes>
  );
};
