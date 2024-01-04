import React from 'react';
import './index.scss';

interface RevenuesHeaderProps {
  selectedView: 'Week' | 'Month';
  handleViewChange: (view: 'Week' | 'Month') => void;
}

export const RevenuesHeader: React.FC<RevenuesHeaderProps> = ({
  selectedView,
  handleViewChange,
}) => {
  return (
    <div className="revenues-header">
      <h2 className="revenues-title">Overview</h2>
    </div>
  );
};
