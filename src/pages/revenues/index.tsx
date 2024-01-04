import React, { useState } from 'react';
import dayjs from 'dayjs';
import './index.scss';
import { RevenuesHeader } from '../../components/revenues/revenues-header';
import { RevenuesDetail } from '../../components/revenues/revenues-detail';
import { RevenuesChooseBody } from '../../components/revenues/revenues-choose-body';
import { RevenuesContent } from '../../components/revenues/revenues-content';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { StatusCardRevenues } from '../../components/revenues/revenues-card';
import { ChartSection } from './chart-section';

export const Revenues: React.FC = () => {
  dayjs.extend(customParseFormat);
  const dateFormat = 'DD/MM/YYYY';

  const [selectedView, setSelectedView] = useState<'Week' | 'Month'>('Week');
  const [selectedContent, setSelectedContent] = useState<'VIP' | 'ADS'>('VIP');
  const [selectedDateRange, setSelectedDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([dayjs('10/05/2023', dateFormat), dayjs('10/01/2024', dateFormat)]);

  const handleViewChange = (view: 'Week' | 'Month') => {
    setSelectedView(view);
  };

  const handleContentChange = (content: 'VIP' | 'ADS') => {
    setSelectedContent(content);
  };

  const handleDateRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null],
  ) => {
    setSelectedDateRange(dates);
  };

  const statusCardWeek = [
    {
      icon: 'bx bx-shopping-bag',
      count: '500.000',
      title: 'Gói VIP',
    },
    {
      icon: 'bx bx-cart',
      count: '0',
      title: 'ADS',
    },
    {
      icon: 'bx bx-dollar-circle',
      count: '200.000',
      title: 'Trong tuần',
    },
    {
      icon: 'bx bx-receipt',
      count: '500.000',
      title: 'Tổng',
    },
  ];

  const statusCardMonth = [
    {
      icon: 'bx bx-shopping-bag',
      count: '500.000',
      title: 'Gói VIP',
    },
    {
      icon: 'bx bx-cart',
      count: '0',
      title: 'ADS',
    },
    {
      icon: 'bx bx-dollar-circle',
      count: '200.000',
      title: 'Trong tuần',
    },
    {
      icon: 'bx bx-receipt',
      count: '500.000',
      title: 'Tổng',
    },
  ];

  const statusCard = selectedView === 'Week' ? statusCardWeek : statusCardMonth;

  return (
    <div className="revenues">
      <RevenuesHeader
        selectedView={selectedView}
        handleViewChange={handleViewChange}
      />

      <div className="row">
        {statusCard.map((item, index) => (
          <div className="col-3" key={index}>
            <StatusCardRevenues
              icon={item.icon}
              count={item.count}
              title={item.title}
              selectedView={selectedView}
            />
          </div>
        ))}

        <div className="col-12">
          <div className="revenues-card card">
            <div>
              <RevenuesDetail
                dateFormat={dateFormat}
                onDateRangeChange={handleDateRangeChange}
              />
            </div>

            <div>
              <RevenuesChooseBody
                selectedContent={selectedContent}
                handleContentChange={handleContentChange}
              />
            </div>
          </div>
          <RevenuesContent
            selectedContent={selectedContent}
            selectedView={selectedView}
            selectedDateRange={selectedDateRange}
          />
          <ChartSection selectedDateRange={selectedDateRange} />
        </div>
      </div>
    </div>
  );
};
