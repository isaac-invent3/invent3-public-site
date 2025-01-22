import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataset,
} from 'chart.js';
import { Flex } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughtnutChartProps {
  labels: string[];
  datasets: ChartDataset<'doughnut'>[];
  type: 'half' | 'full';
  height?: string;
  cutout?: string;
}
const DoughtnutChart = (props: DoughtnutChartProps) => {
  const { labels, datasets, type, height, cutout } = props;
  const data = {
    labels: labels,
    datasets,
  };

  const options = {
    rotation: -90, // Starts from the top
    circumference: type === 'full' ? 360 : 180, // Limits to a half circle
    cutout,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Flex width="full" height={height ?? '100px'}>
      <Doughnut data={data} options={options} />
    </Flex>
  );
};

export default DoughtnutChart;
