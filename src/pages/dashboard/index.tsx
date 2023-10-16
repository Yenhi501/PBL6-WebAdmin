import React from 'react';
import { Link } from 'react-router-dom';
import { StatusCard } from '../../components/status-card/index';
import { TableResult } from '../../components/table/index';
import statusCards from '../../assets/JsonData/status-card-data.json';
import './index.scss';
import { Search } from '../../components/search/index';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        {statusCards.map((item, index) => (
          <div className="col-3" key={index}>
            <StatusCard
              icon={item.icon}
              count={item.count}
              title={item.title}
            />
          </div>
        ))}

        <div className="col-12">
          <div className="card">
            <div className="search-bar">
              <Search />
            </div>
          </div>
          <div className="card__body">
            <TableResult />
          </div>
        </div>
      </div>
    </div>
  );
};
