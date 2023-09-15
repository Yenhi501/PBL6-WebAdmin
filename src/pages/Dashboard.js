import React from "react";

import { Link } from "react-router-dom";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";

import statusCards from "../assets/JsonData/status-card-data.json";

const topCustomers = {
  head: ["user", "orders", "spending"],
  body: [
    {
      username: "john",
      order: "490",
      price: "$15,870",
    },
    {
      username: "iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "frank",
      order: "110",
      price: "$9,251",
    },
    {
      username: "anthony",
      order: "80",
      price: "$8,840",
    },
    {
      username: "baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "Jsons",
      order: "80",
      price: "$8,840",
    },
    {
      username: "anthony",
      order: "80",
      price: "$8,840",
    },
    {
      username: "frank",
      order: "110",
      price: "$9,251",
    },
    {
      username: "Machos",
      order: "80",
      price: "$8,840",
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
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
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}
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

export default Dashboard;
