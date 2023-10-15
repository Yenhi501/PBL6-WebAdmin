import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './index.scss';
import { TopNav } from '../../components/topnav/index';
import { useSelector, useDispatch } from 'react-redux';
import ThemeAction from '../../redux/actions/ThemeAction';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Movies } from '../movies';
import { User } from '../user';
import { Revenues } from '../revenues';
import { VIPPackages } from '../VIPPackages';
import { Dashboard } from '../dashboard';

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

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  return (
    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item
              key="1"
              icon={<UserOutlined rev="" />}
              onClick={() => setSelectedItem('Dashboard')}
            >
              <Link to="/">Dashboard</Link>
            </Menu.Item>

            <Menu.Item
              key="2"
              icon={<UserOutlined rev="" />}
              onClick={() => setSelectedItem('Movies')}
            >
              <Link to="/movies">Movies</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<VideoCameraOutlined rev="" />}
              onClick={() => setSelectedItem('Revenues')}
            >
              <Link to="/revenues">Revenues</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<UploadOutlined rev="" />}
              onClick={() => setSelectedItem('VIPPackages')}
            >
              <Link to="/vip-packages">VIP packages</Link>
            </Menu.Item>
            <Menu.Item
              key="5"
              icon={<UserOutlined rev="" />}
              onClick={() => setSelectedItem('User')}
            >
              <Link to="/user">User</Link>
            </Menu.Item>
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
            {selectedItem === 'Dashboard' && <Dashboard />}
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
