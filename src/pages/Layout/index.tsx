import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { TopNav } from '../../components/topnav/index';
import { useSelector, useDispatch } from 'react-redux';
import ThemeAction from '../../redux/actions/ThemeAction';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SketchOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuOutlined,
  LogoutOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar } from 'antd';
import { Movies } from '../movies';
import { User } from '../user';
import { Revenues } from '../revenues';
import { VIPPackages } from '../VIPPackages';

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
  const [selectedItem, setSelectedItem] = useState('Movies');
  return (
    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu mode="inline" defaultSelectedKeys={['1']}>
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


            <Menu.Item
              key="1"
              icon={<HomeOutlined rev="" />}
              onClick={() => setSelectedItem('Dashboard')}
            >
              <Link to="/">Tổng quan</Link>
            </Menu.Item>

            <Menu.Item
              key="2"
              icon={<VideoCameraOutlined rev="" />}
              onClick={() => setSelectedItem('Movies')}
            >
              <Link to="/movies">Phim</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<ShoppingCartOutlined rev="" />}
              onClick={() => setSelectedItem('Revenues')}
            >
              <Link to="/revenues">Doanh thu</Link>
            </Menu.Item>
            <Menu.Item

              key="4"
              icon={<SketchOutlined rev="" />}
              onClick={() => setSelectedItem('VIPPackages')}
            >
              <Link to="/vip-packages">Gói Vip</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<UserOutlined rev="" />}
              onClick={() => setSelectedItem('User')}
            >
              <Link to="/user">Người dùng</Link>
            </Menu.Item>

            {isLogin ? (
              <div className="login">
                <Menu.Item icon={<LogoutOutlined rev="" />}>
                  <Link to="/">Đăng xuất</Link>
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
            {selectedItem === 'Movies' && <Movies />}
            {selectedItem === 'Revenues' && <Revenues />}
            {selectedItem === 'VIPPackages' && <VIPPackages />}
            {selectedItem === 'User' && <User />}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
