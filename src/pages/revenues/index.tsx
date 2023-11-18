import React, { useState } from 'react';
import dayjs from 'dayjs';
import './index.scss';
import { RevenuesHeader } from '../../components/revenues/revenues-header';
import { RevenuesDetail } from '../../components/revenues/revenues-detail';
import { RevenuesChooseBody } from '../../components/revenues/revenues-choose-body';
import { RevenuesContent } from '../../components/revenues/revenues-content';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { StatusCardRevenues } from '../../components/revenues/revenues-card';

export const Revenues: React.FC = () => {
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY/MM/DD';

  const [selectedView, setSelectedView] = useState<'Week' | 'Month'>('Week');
  const [selectedContent, setSelectedContent] = useState<'VIP' | 'ADS'>('VIP');
  const [selectedDateRange, setSelectedDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([dayjs('2023/01/01', dateFormat), dayjs('2023/07/01', dateFormat)]);

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
      count: '$2,632',
      title: 'From Vip',
    },
    {
      icon: 'bx bx-cart',
      count: '$4,629',
      title: 'From ADS',
    },
    {
      icon: 'bx bx-dollar-circle',
      count: '$70,328',
      title: 'Total Week',
    },
    {
      icon: 'bx bx-receipt',
      count: '$20,454',
      title: 'All',
    },
  ];

  const statusCardMonth = [
    {
      icon: 'bx bx-shopping-bag',
      count: '$23,632',
      title: 'From Vip',
    },
    {
      icon: 'bx bx-cart',
      count: '$43,629',
      title: 'From ADS',
    },
    {
      icon: 'bx bx-dollar-circle',
      count: '$50,328',
      title: 'Total Week',
    },
    {
      icon: 'bx bx-receipt',
      count: '$32,454',
      title: 'All',
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
        </div>
      </div>
    </div>
  );
};
