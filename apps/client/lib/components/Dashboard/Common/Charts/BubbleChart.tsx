import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataset,
  ChartData,
} from 'chart.js';
import { Flex, Skeleton } from '@chakra-ui/react';

ChartJS.register(PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BubbleDataPoint {
  x: number;
  y: number;
  r: number;
  color?: string; // optional per-bubble color
}

interface BubbleChartProps {
  labels?: string[];
  datasets: (Omit<ChartDataset<'bubble', BubbleDataPoint[]>, 'data'> & {
    data: BubbleDataPoint[];
  })[];
  isLoading: boolean;
  height?: string;
  showXGrid?: boolean;
  showYGrid?: boolean;
  xLabel?: string;
  yLabel?: string;
  showDots?: boolean;
}

const BubbleChart = ({
  labels,
  datasets,
  isLoading,
  height,
  showXGrid = true,
  showYGrid = true,
  xLabel = '',
  yLabel = '',
  showDots = true,
}: BubbleChartProps) => {
  const chartData: ChartData<'bubble', BubbleDataPoint[], string> = {
    labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      // Map per-bubble color safely as readonly arrays
      backgroundColor: ds.data.map(
        (bubble) =>
          bubble.color ||
          (ds.backgroundColor as string) ||
          'rgba(75,192,192,0.6)'
      ) as readonly string[],
      borderColor: ds.data.map(
        (bubble) =>
          bubble.color?.replace('0.6', '1') ||
          (typeof ds.borderColor === 'string'
            ? ds.borderColor
            : 'rgba(75,192,192,1)')
      ) as readonly string[],
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: showDots ? (ctx: any) => ctx.raw?.r || 5 : 0,
        hoverRadius: showDots ? 8 : 0,
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
        labels: {
          color: '#4A4A4A',
          font: { size: 12, weight: 'normal' },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const { x, y, r } = context.raw || {};
            return `x: ${x}, y: ${y}, size: ${r}`;
          },
        },
      },
      datalabels: {
        display: true,
        color: '#000',
        font: {
          weight: 'bold',
          size: 10,
        },
        formatter: function (value: any) {
          return value.amountLabel || '';
        },
      },
    },
    scales: {
      x: {
        title: xLabel
          ? {
              display: true,
              text: xLabel,
              color: '#838383',
              //   font: { size: 12, weight: '700' },
            }
          : undefined,
        grid: {
          borderDash: [8, 4],
          color: '#BBBBBB',
          display: showXGrid,
        },
        ticks: { color: '#838383' },
      },
      y: {
        title: yLabel
          ? {
              display: true,
              text: yLabel,
              color: '#838383',
              //   font: { size: 12, weight: '700' },
            }
          : undefined,
        grid: { display: showYGrid },
        ticks: { color: '#838383' },
      },
    },
  } as const;

  return (
    <Skeleton isLoaded={!isLoading} width="full">
      <Flex width="full" height={height ?? '250px'}>
        <Bubble data={chartData} options={options} />
      </Flex>
    </Skeleton>
  );
};

export default BubbleChart;
