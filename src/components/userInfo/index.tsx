import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';

export type UserInfoComponent = {
  id?: string | number;
  isShowEmail?: boolean;
  email?: string;
  avt?: string;
  name?: string;
  people?: 'user' | 'actor' | 'director';
};
export type Info = {
  avatarURL: string;
  username: string;
  email: string;
};

export type InfoDA = {
  poster: string;
  name: string;
};

export const UserInfo = ({
  id,
  isShowEmail = true,
  email,
  avt,
  name,
  people = 'user',
}: UserInfoComponent) => {
  const [info, setInfo] = useState<Info>({
    avatarURL: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    username: 'Default Name',
    email: 'default@gmail.com',
  });
  const [infoDA, setInfoDA] = useState<InfoDA>({
    poster: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    name: 'Default Name',
  });

  const urlQueryMap: Record<string, string> = {
    user: 'http://localhost:8000/api/user/get-user',
    actor: `http://localhost:8000/api/individuals/actors/${id}`,
    director: `http://localhost:8000/api/individuals/directors/${id}`,
  };

  const getDataUser = () => {
    axios
      .get(urlQueryMap[people], {
        headers: { 'Content-Type': 'application/json' },
        params: people === 'user' ? { userId: id } : {},
      })
      .then((res) => {
        people === 'user' ? setInfo(res.data) : setInfoDA(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id != null) {
      getDataUser();
    }
  }, [id]);

  return (
    <div className="user-info-container">
      <Avatar
        src={
          <img
            // src={avt || people === 'user' ? info.avatarURL : infoDA.poster}
            src="https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
            alt="avatar"
          />
        }
        size={50}
      />
      <div className="user-info">
        <h3 className="user-name">
          {name || people === 'user' ? info.username : infoDA.name}
        </h3>
        <p className="user-email" hidden={!isShowEmail}>
          {email || info.email}
        </p>
      </div>
    </div>
  );
};
