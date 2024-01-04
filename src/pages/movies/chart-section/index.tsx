import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { endpointServer } from '../../../utils/endpoint';
import { useToken } from '../../../hooks/useToken';
import dayjs, { Dayjs } from 'dayjs';
import { ChartGenreMovie, defaultChartGenreMovie } from '../../../model/chart';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { DatePicker } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  PointElement,
  LineElement,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thống kê phim theo thể loại',
    },
  },
  elements: {
    point: {
      borderWidth: 6,
    },
  },
};

export const optionsComment = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thống kê bình luận phim',
    },
  },
  elements: {
    point: {
      borderWidth: 6,
    },
  },
};

const { RangePicker } = DatePicker;

function getListOfMonths(startDate: Dayjs, endDate: Dayjs) {
  let current = dayjs(startDate).startOf('month');
  const end = dayjs(endDate).endOf('month');

  const months = [];

  while (current.isBefore(end) || current.isSame(end, 'month')) {
    months.push(current.format('YYYY-MM'));
    current = current.add(1, 'month').startOf('month');
  }

  return months;
}

export type ChartSection = {};
export const ChartSection = ({}: ChartSection) => {
  const [dataGet, setDataGet] = useState<ChartGenreMovie[]>([
    defaultChartGenreMovie,
  ]);
  const [dataComments, setDataComments] = useState<
    Array<{ month: string; count: number }>
  >([]);
  const [dataSubComments, setDataSubComments] = useState<
    Array<{ month: string; count: number }>
  >([]);

  const { accessToken } = useToken();

  const getDataGenre = () => {
    axios
      .get(`${endpointServer}/statisticals/movies-by-genres`, {
        headers: { Authorization: 'Bearer ' + accessToken },
      })
      .then((res) => setDataGet(res.data.data))
      .catch((err) => console.log(err));
  };

  const [selectedDateRange, setSelectedDateRange] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs('2023-05-10', 'YYYY-MM-DD'), dayjs('2024-01-10', 'YYYY-MM-DD')]);

  const getDataComment = () => {
    axios
      .get(`${endpointServer}/statisticals/comments`, {
        headers: { Authorization: 'Bearer ' + accessToken },
        params: {
          startDate: selectedDateRange[0].format('YYYY-MM-DD'),
          endDate: selectedDateRange[1].format('YYYY-MM-DD'),
        },
      })
      .then((res) => {
        setDataComments(res.data.data.comments);
        setDataSubComments(res.data.data.subComments);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataGenre();
  }, []);

  useEffect(() => {
    getDataComment();
  }, [selectedDateRange]);

  const [listOfMonth, setListOfMonth] = useState(['']);

  useEffect(() => {
    const listOfMonths = getListOfMonths(
      selectedDateRange[0],
      selectedDateRange[1],
    );
    setListOfMonth(listOfMonths);
  }, [selectedDateRange]);

  const data = {
    labels: dataGet.map((item) => item.name),
    datasets: [
      {
        label: 'Số lượng phim',
        data: dataGet.map((item) => item.count),
        backgroundColor: '#59afff',
        borderColor: '#59afff',
      },
    ],
  };

  const dataComment = {
    labels: dataComments.map((item) => dayjs(item.month).format('DD/MM/YYYY')),
    datasets: [
      {
        label: 'Số bình luận',
        data: dataComments.map((item) => item.count),
        backgroundColor: '#59afff',
        borderColor: '#59afff',
      },
      {
        label: 'Số trả lời',
        data: dataSubComments.map((item) => item.count),
        backgroundColor: '#ff4848',
        borderColor: '#ff4848',
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
      <h1 className="detail-title">Khoảng thời gian</h1>
      <RangePicker
        className="date-picker"
        defaultValue={[
          dayjs('2023-05-10', 'YYYY-MM-DD'),
          dayjs('2024-01-10', 'YYYY-MM-DD'),
        ]}
        format={'YYYY-MM-DD'}
        onChange={(dates) =>
          dates != null
            ? setSelectedDateRange([
                dates[0] as dayjs.Dayjs,
                dates[1] as dayjs.Dayjs,
              ])
            : ''
        }
        locale={locale}
        allowClear={false}
      />
      <Line options={optionsComment} data={dataComment} />
    </div>
  );
};
