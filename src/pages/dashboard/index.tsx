import React from 'react';
import { Link } from 'react-router-dom';
import { StatusCard } from '../../components/status-card/index';
import Table from '../../components/table/Table';
import statusCards from '../../assets/JsonData/status-card-data.json';
import './index.scss';

const topCustomers = {
  head: ['user', 'orders', 'spending'],
  body: [
    {
      username: 'john',
      order: '490',
      price: '$15,870',
    },
    {
      username: 'iva',
      order: '250',
      price: '$12,251',
    },
  ],
};

const renderCusomerHead = (item: string, index: number) => (
  <th key={index}>{item}</th>
);

const renderCusomerBody = (item: any, index: number) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

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
            <div className="col-4">
              <div className="topnav__search">
                <input type="text" placeholder="Search here ..." />
                <i className="bx bx-search"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>top customers</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item: any, index: number) =>
                  renderCusomerHead(item, index)
                }
                bodyData={topCustomers.body}
                renderBody={(item: any, index: number) =>
                  renderCusomerBody(item, index)
                }
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
