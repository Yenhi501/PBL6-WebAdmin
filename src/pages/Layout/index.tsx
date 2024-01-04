import React, { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './index.scss';
import { TopNav } from '../../components/topnav/index';
import { useSelector, useDispatch } from 'react-redux';

import {
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  SketchOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UserSwitchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Modal, theme } from 'antd';
import { Movies } from '../movies';
import { UserPage } from '../user';
import { Revenues } from '../revenues';
import { VIPPackages } from '../VIPPackages';
import { DAPage } from '../director-actor';

import './index.scss';
import { RegisterPage } from '../register';
import { refreshToken } from '../../utils/getRefreshToken';
import { useToken } from '../../hooks/useToken';
import axios from 'axios';
import { endpointServer } from '../../utils/endpoint';
import Cookies from 'js-cookie';

const { Header, Sider, Content } = Layout;

export const LayoutAdmin: React.FC = () => {
  const timeRefreshToken = 1000 * 14 * 60; /*14m*/
  const { accessToken } = useToken();

  useEffect(() => {
    refreshToken();
    const timer = setInterval(refreshToken, timeRefreshToken);
    return () => clearInterval(timer);
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { pathname } = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const checkAccessToken = () => {
    axios
      .get(`${endpointServer}/user/get-user`, {
        headers: { Authorization: 'Bearer ' + accessToken },
        params: { userId: 1 },
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setIsOpenModal(true);
        }
      });
  };

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      Cookies.remove('accessToken');
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        Cookies.remove('accessToken');
      });
    };
  }, []);

  useEffect(() => {
    checkAccessToken();
  }, [accessToken]);

  const navigator = useNavigate();

  return (
    <div className={`layout `}>
      <Modal
        title="Cảnh báo truy cập"
        open={isOpenModal}
        onCancel={() => {
          navigator('/');
        }}
        footer={[
          <Button type="primary" onClick={() => navigator('/')}>
            Đăng nhập
          </Button>,
        ]}
        okText="Đăng nhập"
      >
        Bạn hiện đang không có quyền truy cập vào trang quản lý, vui lòng đăng
        nhập bằng tài khoản chủ/quản lý để tiếp tụcs
      </Modal>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="sider"
        >
          <div className="demo-logo-vertical" />
          <Menu mode="inline" selectedKeys={[pathname]}>
            <div className="menu-title">
              {collapsed ? (
                <MenuOutlined rev="" />
              ) : (
                <div>
                  <Avatar
                    shape="square"
                    size={64}
                    icon={<UserOutlined rev={undefined} />}
                  />
                </div>
              )}
            </div>

            <Menu.Item key="/admin/movies" icon={<UserOutlined rev="" />}>
              <Link to="/admin/movies">Phim</Link>
            </Menu.Item>
            <Menu.Item
              key="/admin/revenues"
              icon={<VideoCameraOutlined rev="" />}
            >
              <Link to="/admin/revenues">Doanh thu</Link>
            </Menu.Item>
            <Menu.Item
              key="/admin/vip-packages"
              icon={<UploadOutlined rev="" />}
            >
              <Link to="/admin/vip-packages">VIP</Link>
            </Menu.Item>
            <Menu.Item key="/admin/user" icon={<UserOutlined rev="" />}>
              <Link to="/admin/user">Người dùng</Link>
            </Menu.Item>
            <Menu.Item
              key="/admin/director-actor"
              icon={<UserSwitchOutlined rev="" />}
            >
              <Link to="/admin/director-actor">Đạo diễn/Diễn viên</Link>
            </Menu.Item>
            <Menu.Item icon={<UserAddOutlined rev="" />}>
              <Link to="/register">Tạo admin</Link>
            </Menu.Item>

            <div className="login">
              <Menu.Item icon={<LogoutOutlined rev="" />}>
                <Link to="/">Đăng xuất</Link>
              </Menu.Item>
            </div>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="header-layout"
            style={{ padding: 0, background: colorBgContainer }}
          >
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined rev="" />
                ) : (
                  <MenuFoldOutlined rev="" />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <TopNav />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/movies" element={<Movies />} />
              <Route path="/revenues" element={<Revenues />} />
              <Route path="/vip-packages" element={<VIPPackages />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/director-actor" element={<DAPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
