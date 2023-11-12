import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import './index.scss';

interface RevenuesDetailProps {
  dateFormat: string;
  onDateRangeChange: (
    dates: [Dayjs | null, Dayjs | null],
    dateStrings: [string, string],
  ) => void;
}

export const RevenuesDetail: React.FC<RevenuesDetailProps> = ({
  dateFormat,
  onDateRangeChange,
}) => {
  const { RangePicker } = DatePicker;

  return (
    <div className="revenues-detail">
      <h1 className="detail-title">Detail</h1>
      <RangePicker
        className="date-picker"
        defaultValue={[
          dayjs('2023/01/01', dateFormat),
          dayjs('2023/07/01', dateFormat),
        ]}
        format={dateFormat}
        onChange={(dates, dateStrings) =>
          onDateRangeChange(
            dates as [Dayjs | null, Dayjs | null],
            dateStrings as [string, string],
          )
        }
      />
    </div>
  );
};
