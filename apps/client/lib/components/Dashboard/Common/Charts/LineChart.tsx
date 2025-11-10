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
  ChartOptions,
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
  xLabel?: string;
  yLabel?: string;
  showDots?: boolean;
  fillArea?: boolean;
  fillGradient?: boolean;
}

const LineChart = (props: LineChartProps) => {
  const {
    labels,
    datasets,
    isLoading,
    height,
    showXGrid = true,
    showYGrid,
    xLabel = '',
    yLabel = '',
    showDots = true,
    fillArea = false,
    fillGradient = false,
  } = props;

  const formattedDatasets = datasets.map((dataset) => ({
    ...dataset,
    fill: fillArea ? true : false,
    backgroundColor: fillArea
      ? (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;

          // ✅ Prevent crash before layout is ready
          if (!chartArea) return null;

          if (!fillGradient) return dataset.borderColor || '#36A2EB44';

          const { top, bottom } = chartArea;
          const gradient = canvasCtx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, `${dataset.borderColor || '#36A2EB'}33`);
          gradient.addColorStop(1, `${dataset.borderColor || '#36A2EB'}00`);
          return gradient;
        }
      : undefined,
  }));

  const data = {
    labels,
    datasets: formattedDatasets,
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: showDots ? 3 : 0,
        hoverRadius: showDots ? 5 : 0,
      },
      line: {
        tension: 0.4,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
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
        title: xLabel
          ? {
              display: true,
              text: xLabel,
              color: '#838383',
              font: { size: 12, weight: 'bold' },
            }
          : undefined,
        grid: {
          // use any cast to bypass Chart.js typings for borderDash
          borderDash: [8, 4],
          color: '#BBBBBB',
          display: showXGrid,
        } as any,
        ticks: {
          color: '#838383',
        },
      },
      y: {
        title: yLabel
          ? {
              display: true,
              text: yLabel,
              color: '#838383',
              font: { size: 12, weight: 'bold' },
            }
          : undefined,
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
