import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Dropdown } from '../dropdown/index';
import ThemeMenu from '../thememenu/ThemeMenu';
import notifications from '../../assets/JsonData/notification.json';
import user_menu from '../../assets/JsonData/user_menus.json';

interface NotificationItem {
  icon: string;
  content: string;
}
export interface CurrentAdmin {
  adminname: string;
  email: string;
  avatar: string;
}
const currentAdmin: CurrentAdmin = {
  adminname: 'admin1',
  email: 'admin1@gmail.com',
  avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
};

const renderNotificationItem = (item: NotificationItem, index: number) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user: CurrentAdmin) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.avatar} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.adminname}</div>
  </div>
);

const renderUserMenu = (item: NotificationItem, index: number) => (
  <Link to="/" key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

export const TopNav: React.FC = () => {
  return (
    <div className="topnav">
      <div className="topnav__search"></div>

      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle(currentAdmin)}
            contentData={user_menu}
            renderItems={(item: any, index: number) =>
              renderUserMenu(item, index)
            }
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge={13}
            contentData={notifications}
            renderItems={(item: any, index: number) =>
              renderNotificationItem(item, index)
            }
            renderFooter={() => <Link to="">View All</Link>}
          />
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
          <Dropdown />
        </div>
      </div>
    </div>
  );
};
