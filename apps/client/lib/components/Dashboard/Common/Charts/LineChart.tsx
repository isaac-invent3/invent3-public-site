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
  ChartDataset,
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
  isLoading: boolean;
  datasets: ChartDataset<'line'>[];
  height?: string;
  showXGrid?: boolean;
  showYGrid?: boolean;
}
const LineChart = (props: LineChartProps) => {
  const {
    labels,
    datasets,
    isLoading,
    height,
    showXGrid = true,
    showYGrid,
  } = props;

  const data = {
    labels,
    datasets,
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
            return `${tooltipItem.raw?.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          borderDash: [8, 4],
          color: '#BBBBBB',
          display: showXGrid,
        },
        ticks: {
          color: '#838383',
        },
      },
      y: {
        grid: {
          display: showYGrid,
        },
        ticks: {
          color: '#838383',
        },
      },
    },
  };

  return (
    <Skeleton isLoaded={!isLoading} width="full">
      <Flex width="full" height={height ?? '250px'}>
        <Line data={data} options={options} />
      </Flex>
    </Skeleton>
  );
};

export default LineChart;
