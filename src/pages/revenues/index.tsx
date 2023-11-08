import { useState } from 'react';
import dayjs from 'dayjs';
import statusCards from '../../assets/JsonData/status-card-data.json';
import { StatusCard } from '../../components/status-card';
import './index.scss';
import { DatePicker } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
export const Revenues = () => {
  dayjs.extend(customParseFormat);

  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY/MM/DD';

  const [selectedButton, setSelectedButton] = useState<'button1' | 'button2'>(
    'button1',
  );

  const handleButtonClick = (button: 'button1' | 'button2') => {
    setSelectedButton(button);
  };
  return (
    <div className="revenues">
      <h2 className="revenues-header">Overview</h2>
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
          <div className="revenues-card card">
            <div>
              <RangePicker
                defaultValue={[
                  dayjs('2015/01/01', dateFormat),
                  dayjs('2015/01/01', dateFormat),
                ]}
                format={dateFormat}
              />
            </div>
            <div className="revenues-choose__body">
              <button
                onClick={() => handleButtonClick('button1')}
                className={`revenues-button ${
                  selectedButton === 'button1' ? 'active' : ''
                }`}
              >
                Button 1
              </button>
              <button
                onClick={() => handleButtonClick('button2')}
                className={`revenues-button ${
                  selectedButton === 'button2' ? 'active' : ''
                }`}
              >
                Button 2
              </button>
            </div>
          </div>
          <div className="content">
            {selectedButton === 'button1' && <div>Content for Button 1</div>}
            {selectedButton === 'button2' && <div>Content for Button 2</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
