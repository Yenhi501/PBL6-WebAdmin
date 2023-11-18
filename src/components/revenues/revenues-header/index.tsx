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
      <div className="revenues-choose__header">
        <button
          onClick={() => handleViewChange('Week')}
          className={`revenues-button ${
            selectedView === 'Week' ? 'active' : ''
          }`}
        >
          Week
        </button>
        <button
          onClick={() => handleViewChange('Month')}
          className={`revenues-button ${
            selectedView === 'Month' ? 'active' : ''
          }`}
        >
          Month
        </button>
      </div>
    </div>
  );
};
