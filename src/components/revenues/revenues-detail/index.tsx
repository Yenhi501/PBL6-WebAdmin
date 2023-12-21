import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import './index.scss';
import locale from 'antd/es/date-picker/locale/vi_VN';

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
      <h1 className="detail-title">Chi tiết</h1>
      <RangePicker
        className="date-picker"
        defaultValue={[
          dayjs('10/12/2023', dateFormat),
          dayjs('20/12/2023', dateFormat),
        ]}
        format={dateFormat}
        onChange={(dates, dateStrings) =>
          onDateRangeChange(
            dates as [Dayjs | null, Dayjs | null],
            dateStrings as [string, string],
          )
        }
        locale={locale}
        allowClear={false}
      />
    </div>
  );
};
