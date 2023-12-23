import React from 'react';
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
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
  'July',
];
export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
    },
  ],
};
// Số lượng phim theo thể loại
// Số lượng lượt xem theo thể loại
// Số lượng lượt xem theo ngày/tháng/năm
// Số lượng bình luận, đánh giá của người dùng theo ngày/tháng/năm
// Xếp hạng 10 phim có số lượng lượt xem/đánh giá cao nhất
export const ChartSection = () => {
  return (
    <div>
      .
      <Bar options={options} data={data} />
      <Bar options={options} data={data} />
      <Line options={options} data={data} />;
      <Line options={options} data={data} />;
      <Bar options={options} data={data} />
    </div>
  );
};
