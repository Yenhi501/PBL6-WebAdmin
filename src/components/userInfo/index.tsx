import { Avatar } from 'antd';
import React, { useState } from 'react';
import './index.scss';

export type UserInfoComponent = { id: string; isShowEmail?: boolean };
export type UserInfo = {
  avt: string;
  name: string;
  email: string;
};
export const UserInfo = ({ id, isShowEmail }: UserInfoComponent) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    avt: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/04/elderscrolls-online.jpg',
    name: 'Nguyen Ngoc Bao Long',
    email: '28072002long@gmail.com',
  });

  return (
    <div className="user-info-container">
      <Avatar src={<img src={userInfo.avt} alt="avatar" />} size={50} />
      <div className="user-info">
        <h3 className="user-name">{userInfo.name}</h3>
        <p className="user-email" hidden={isShowEmail}>
          {userInfo.email}
        </p>
      </div>
    </div>
  );
};
