import React from 'react';

interface StatusCardRevenuesProps {
  icon: string;
  count: string;
  title: string;
  selectedView: 'Week' | 'Month';
}

export const StatusCardRevenues: React.FC<StatusCardRevenuesProps> = ({
  icon,
  count,
  title,
  selectedView,
}) => {
  //   let updatedCount = count;

  //   if (selectedView === 'Month') {
  //     updatedCount = `$${parseInt(count.replace(/\$|,/g, '')) * 10}`;
  //   }

  return (
    <div className="status-card">
      <div className="status-card__icon">
        <i className={icon}></i>
      </div>
      <div className="status-card__info">
        <h4>{count}</h4>
        <span>{title}</span>
      </div>
    </div>
  );
};
