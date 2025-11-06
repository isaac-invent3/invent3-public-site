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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Flex, Skeleton } from '@chakra-ui/react';

// Register plugins
ChartJS.register(
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface BubbleDataPoint {
  x: number;
  y: number;
  r: number;
  color?: string;
  amountLabel?: string;
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
        hoverRadius: showDots ? 10 : 0,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const { amountLabel, x, y } = context.raw || {};
            return [
              `Condition Index: ${x}`,
              `Risk Score: ${y}`,
              `Asset Cost: ${amountLabel}`,
            ];
          },
        },
      },
      datalabels: {
        display: true,
        color: '#000',
        align: 'center' as const,
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
