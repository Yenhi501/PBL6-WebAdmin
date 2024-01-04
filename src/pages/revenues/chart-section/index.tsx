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
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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
      text: 'Thống kê doanh thu theo ngày',
    },
  },
  elements: {
    point: {
      borderWidth: 6,
    },
  },
};

export type ChartSection = {
  selectedDateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null];
};
export const ChartSection = ({ selectedDateRange }: ChartSection) => {
  const [dataRevenue, setDataRevenue] = useState<
    Array<{ interval: string; total_price: number }>
  >([{ interval: '', total_price: 0 }]);
  const { accessToken } = useToken();

  const getDataRevenue = () => {
    axios
      .get(`${endpointServer}/statisticals/revenues`, {
        headers: { Authorization: 'Bearer ' + accessToken },
        params: {
          startDate: dayjs(selectedDateRange[0]).format('YYYY-MM-DD'),
          endDate: dayjs(selectedDateRange[1]).format('YYYY-MM-DD'),
          statisBy: 'day',
        },
      })
      .then((res) => {
        setDataRevenue(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const data = {
    labels: dataRevenue.map((item) =>
      dayjs(item.interval).format('DD/MM/YYYY'),
    ),
    datasets: [
      {
        label: 'Doanh thu theo ngày',
        data: dataRevenue.map((item) => item.total_price),
        backgroundColor: '#59afff',
        borderColor: '#59afff',
      },
    ],
  };

  useEffect(() => {
    getDataRevenue();
  }, [selectedDateRange]);

  return (
    <div>
      <Line options={options} data={data} />;
    </div>
  );
};
