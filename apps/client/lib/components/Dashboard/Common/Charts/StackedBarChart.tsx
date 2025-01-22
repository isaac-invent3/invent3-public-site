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

interface ItemProps {
  label: string;
  values: number[];
  color: string;
}
interface StackedBarChartProps {
  labels: (string | undefined)[];
  firstStack: ItemProps;
  secondStack: ItemProps;
  isLoading: boolean;
  height?: string;
}
const StackedBarChart = (props: StackedBarChartProps) => {
  const { labels, firstStack, secondStack, isLoading, height } = props;
  const data = {
    labels: labels,
    datasets: [
      {
        label: firstStack.label,
        data: firstStack.values,
        backgroundColor: firstStack.color,
        // borderRadius: {
        //   topLeft: 3.48,
        //   topRight: 3.48,
        // },
      },
      {
        label: secondStack.label,
        data: secondStack.values,
        backgroundColor: secondStack.color,
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
      <Flex height={height ?? '250px'} width="full">
        <Bar data={data} options={options} />
      </Flex>
    </Skeleton>
  );
};

export default StackedBarChart;
