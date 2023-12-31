import React from 'react';

import './index.scss';

interface StatusCardProps {
  icon: string;
  count: string | number;
  title: string;
}

export const StatusCard: React.FC<StatusCardProps> = (props) => {
  return (
    <div className="status-card">
      <div className="status-card__icon">
        <i className={props.icon}></i>
      </div>
      <div className="status-card__info">
        <h4>{props.count}</h4>
        <span className="!ml-2">{props.title}</span>
      </div>
    </div>
  );
};
