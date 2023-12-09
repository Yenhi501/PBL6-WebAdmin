import { Avatar } from 'antd';
import React, { useState } from 'react';
import './index.scss';

export type UserInfoComponent = { id: string; isShowEmail?: boolean };
export type UserInfo = {
  avt: string;
  name: string;
  email: string;
};
export const UserInfo = ({ id, isShowEmail = true }: UserInfoComponent) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    avt: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    name: 'Nguyen Ngoc Bao Long',
    email: '28072002long@gmail.com',
  });

  return (
    <div className="user-info-container">
      <Avatar src={<img src={userInfo.avt} alt="avatar" />} size={50} />
      <div className="user-info">
        <h3 className="user-name">{userInfo.name}</h3>
        <p className="user-email" hidden={!isShowEmail}>
          {userInfo.email}
        </p>
      </div>
    </div>
  );
};
