import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import './index.scss';
import { TopNav } from '../../components/topnav/index';
import { useSelector, useDispatch } from 'react-redux';

import {
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
import { Avatar, Button, Layout, Menu, theme } from 'antd';
import ThemeAction from '../../redux/actions/ThemeAction';
import { Movies } from '../movies';
import { UserPage } from '../user';
import { Revenues } from '../revenues';
import { VIPPackages } from '../VIPPackages';
import { DAPage } from '../director-actor';

import './index.scss';

const { Header, Sider, Content } = Layout;

export const LayoutAdmin: React.FC = () => {
  const themeReducer = useSelector((state: any) => state.ThemeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem('themeMode') || 'theme-mode-light';
    const colorClass = localStorage.getItem('colorMode') || 'theme-mode-light';

    dispatch(ThemeAction.setMode(themeClass));
    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  const [isLogin, setIsLogin] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { pathname } = useLocation();

  return (
    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
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

            <Menu.Item key="/movies" icon={<UserOutlined rev="" />}>
              <Link to="/movies">Phim</Link>
            </Menu.Item>
            <Menu.Item key="/revenues" icon={<VideoCameraOutlined rev="" />}>
              <Link to="/revenues">Doanh thu</Link>
            </Menu.Item>
            <Menu.Item key="/vip-packages" icon={<UploadOutlined rev="" />}>
              <Link to="/vip-packages">VIP</Link>
            </Menu.Item>
            <Menu.Item key="/user" icon={<UserOutlined rev="" />}>
              <Link to="/user">Người dùng</Link>
            </Menu.Item>
            <Menu.Item
              key="/director-actor"
              icon={<UserSwitchOutlined rev="" />}
            >
              <Link to="/director-actor">Đạo diễn/Diễn viên</Link>
            </Menu.Item>

            {isLogin ? (
              <div className="login">
                <Menu.Item icon={<LogoutOutlined rev="" />}>
                  <Link to="/movies">Đăng xuất</Link>
                </Menu.Item>
              </div>
            ) : (
              <div className="login">
                <Menu.Item icon={<LoginOutlined rev="" />}>
                  <Link to="/login">Đăng nhập</Link>
                </Menu.Item>
              </div>
            )}
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
              <Route path="/" element={<Movies />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/revenues" element={<Revenues />} />
              <Route path="/vip-packages" element={<VIPPackages />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/director-actor" element={<DAPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
