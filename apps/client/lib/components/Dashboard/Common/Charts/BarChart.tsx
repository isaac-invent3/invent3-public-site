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

interface BarChartProps {
  labels: (string | undefined)[];
  chartData: ItemProps[];
  isLoading: boolean;
  height?: string;
  showGridX?: boolean;
  showGridY?: boolean;
  barRadius?: number | Partial<BorderRadius>;
  isStacked?: boolean;
  /** 👇 New prop to control bar orientation */
  horizontal?: boolean;
}

const BarChart = (props: BarChartProps) => {
  const {
    labels,
    chartData,
    isLoading,
    height,
    showGridX = false,
    showGridY = true,
    barRadius = 0,
    isStacked = true,
    horizontal = false, // 👈 default to vertical
  } = props;

  const data = {
    labels,
    datasets: chartData
      ? chartData.map((item) => ({
          label: item.label,
          data: item.values,
          backgroundColor: item.color,
          borderRadius: barRadius,
        }))
      : [],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' : 'x', // 👈 Control orientation
    plugins: {
      legend: { display: false },
      datalabels: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw?.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        stacked: isStacked,
        grid: {
          display: showGridX,
          color: '#E0E0E0',
        },
        ticks: {
          color: '#838383',
        },
      },
      y: {
        stacked: isStacked,
        grid: {
          display: showGridY,
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

export default BarChart;
