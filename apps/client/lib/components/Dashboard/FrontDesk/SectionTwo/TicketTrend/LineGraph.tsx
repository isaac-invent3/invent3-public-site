import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Flex, Skeleton } from '@chakra-ui/react';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: (string | undefined)[];
  opened: number[];
  resolved: number[];
  isLoading: boolean;
}
const LineChart = (props: LineChartProps) => {
  const { labels, opened, resolved, isLoading } = props;

  const data = {
    labels,
    datasets: [
      {
        label: 'Opened',
        data: opened,
        borderColor: '#0366EF',
        pointBorderColor: '#fff',
        pointBackgroundColor: '#0366EF',
        pointRadius: 6,
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.4)',
          offset: { x: 0, y: 2 },
          blur: 4,
        },
      },
      {
        label: 'Resolved',
        data: resolved,
        borderColor: '#00A129',
        borderDash: [8, 4],
        pointRadius: 0,
        fill: false,
        tension: 0.4,
        borderWidth: 2,
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
        grid: {
          borderDash: [8, 4],
          color: '#BBBBBB',
        },
        ticks: {
          color: '#838383',
        },
      },
      y: {
        grid: {
          display: false,
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
        <Line data={data} options={options} />
      </Flex>
    </Skeleton>
  );
};

export default LineChart;
