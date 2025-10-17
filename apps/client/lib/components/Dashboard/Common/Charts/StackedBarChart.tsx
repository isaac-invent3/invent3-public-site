import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  BorderRadius,
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
  secondStack?: ItemProps;
  isLoading: boolean;
  height?: string;
  showGridX?: boolean;
  showGridY?: boolean;
  barRadius?: number | Partial<BorderRadius>; // 👈 New flexible radius prop
}

const StackedBarChart = (props: StackedBarChartProps) => {
  const {
    labels,
    firstStack,
    secondStack,
    isLoading,
    height,
    showGridX = false,
    showGridY = true,
    barRadius = 0,
  } = props;

  const data = {
    labels,
    datasets: [
      {
        label: firstStack.label,
        data: firstStack.values,
        backgroundColor: firstStack.color,
        borderRadius: barRadius,
      },
      ...(secondStack
        ? [
            {
              label: secondStack.label,
              data: secondStack.values,
              backgroundColor: secondStack.color,
              borderRadius: barRadius,
            },
          ]
        : []),
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw?.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: showGridX,
          color: '#E0E0E0',
          // borderDash: [6, 3],
        },
        ticks: {
          color: '#838383',
        },
      },
      y: {
        stacked: true,
        grid: {
          display: showGridY,
          color: '#BBBBBB',
          // borderDash: [8, 4],
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
