import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { endpointServer } from '../../utils/endpoint';
import { useToken } from '../../hooks/useToken';

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
  avatar: string;
  name: string;
};

const defaultUser = {
  avatarURL: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
  username: 'Default Name',
  email: 'default@gmail.com',
};

const defaultDA = {
  avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
  name: 'Default Name',
};

export const UserInfo = ({
  id,
  isShowEmail = true,
  email,
  avt,
  name,
  people = 'user',
}: UserInfoComponent) => {
  const [info, setInfo] = useState<Info>(defaultUser);
  const [infoDA, setInfoDA] = useState<InfoDA>(defaultDA);
  const { accessToken } = useToken();

  const urlQueryMap: Record<string, string> = {
    user: `${endpointServer}/user/get-user`,
    actor: `${endpointServer}/individuals/actors/${id}`,
    director: `${endpointServer}/individuals/directors/${id}`,
  };

  const getDataUser = () => {
    axios
      .get(urlQueryMap[people], {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        params: people === 'user' ? { userId: id } : {},
      })
      .then((res) => {
        people === 'user' ? setInfo(res.data) : setInfoDA(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id != null && id !== '0' && !Number.isNaN(id)) {
      getDataUser();
    } else {
      setInfo(defaultUser);
      setInfoDA(defaultDA);
    }
  }, [id]);

  return (
    <div className="user-info-container">
      <Avatar
        src={
          <img
            src={
              avt || people === 'user'
                ? info.avatarURL ||
                  'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
                : infoDA.avatar ||
                  'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
            }
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
