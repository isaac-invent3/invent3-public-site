import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Flex, Skeleton } from '@chakra-ui/react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface StackedBarChartProps {
  labels: (string | undefined)[];
  completed: number[];
  not_completed: number[];
  isLoading: boolean;
}
const StackedBarChart = (props: StackedBarChartProps) => {
  const { labels, completed, not_completed, isLoading } = props;
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Completed',
        data: completed,
        backgroundColor: '#033376',
        // borderRadius: {
        //   topLeft: 3.48,
        //   topRight: 3.48,
        // },
      },
      {
        label: 'Not Completed',
        data: not_completed,
        backgroundColor: '#00A129',
        // borderRadius: {
        //   topLeft: 3.48,
        //   topRight: 3.48,
        // },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#838383',
        },
      },
      y: {
        stacked: true,
        grid: {
          borderDash: [8, 4],
          color: '#BBBBBB',
        },
        ticks: {
          color: '#838383',
        },
      },
    },
  };

  return (
    <Skeleton isLoaded={!isLoading} width="full">
      <Flex width="full" height="250px">
        <Bar data={data} options={options} />
      </Flex>
    </Skeleton>
  );
};

export default StackedBarChart;
