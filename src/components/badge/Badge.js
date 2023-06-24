import React from "react";

import "./badge.css";

// const badgeStyle = {
//   danger: "badge-danger",
//   primary: "badge-primary",
//   danger: "badge-danger",
//   danger: "badge-danger",
// };

const Badge = (props) => {
  return <span className={`badge badge-${props.type}`}>{props.content} </span>;
};

export default Badge;
