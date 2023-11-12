import React from 'react';
import './index.scss';
interface RevenuesChooseBodyProps {
  selectedContent: 'VIP' | 'ADS';
  handleContentChange: (content: 'VIP' | 'ADS') => void;
}

export const RevenuesChooseBody: React.FC<RevenuesChooseBodyProps> = ({
  selectedContent,
  handleContentChange,
}) => {
  return (
    <div className="revenues-choose__body">
      <button
        onClick={() => handleContentChange('VIP')}
        className={`revenues-button ${
          selectedContent === 'VIP' ? 'active' : ''
        }`}
      >
        VIP
      </button>
      <button
        onClick={() => handleContentChange('ADS')}
        className={`revenues-button ${
          selectedContent === 'ADS' ? 'active' : ''
        }`}
      >
        ADS
      </button>
    </div>
  );
};
