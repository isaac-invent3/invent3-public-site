import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataset,
  ChartOptions,
} from 'chart.js';
import { Flex } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughtnutChartProps {
  labels: string[];
  datasets: ChartDataset<'doughnut'>[];
  type: 'half' | 'full';
  height?: string;
  cutout?: string;
  centerLabel?: { title: string; value: string };
  showSliceLabels?: boolean;
  tooltipFormatter?: (value: number, total: number, label: string) => string[];
}

const DoughtnutChart = (props: DoughtnutChartProps) => {
  const {
    labels,
    datasets,
    type,
    height,
    cutout,
    centerLabel,
    showSliceLabels,
    tooltipFormatter,
  } = props;

  const isEmpty =
    datasets.length === 0 ||
    datasets.every((d) => d.data.every((val) => val === 0));

  const data = {
    labels: labels,
    datasets: isEmpty
      ? [
          {
            data: [1],
            backgroundColor: '#B4BFCA80',
            borderWidth: 0,
          },
        ]
      : datasets,
  };

  const options: ChartOptions<'doughnut'> = {
    rotation: -90,
    circumference: type === 'full' ? 360 : 180,
    cutout,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const dataset =
              tooltipItem.chart.data.datasets[tooltipItem.datasetIndex];
            const value = dataset.data[tooltipItem.dataIndex];
            const total = dataset.data.reduce(
              (acc: number, val: number) => acc + val,
              0
            );
            const label = tooltipItem.label;

            if (tooltipFormatter) {
              return tooltipFormatter(value, total, label);
            }

            // ✅ Default generic fallback
            const percent = ((value / total) * 100).toFixed(0);
            return [`${label}: ${percent}%`, `Value: ${value}`];
          },
        },
        backgroundColor: '#000000CC',
        bodyColor: '#fff',
        titleColor: '#fff',
        displayColors: false,
        padding: 10,
        cornerRadius: 6,
      },
    },
  };

  // ✅ Center text plugin remains the same
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart: any) => {
      if (centerLabel) {
        const { width, height } = chart;
        const ctx = chart.ctx;
        ctx.restore();

        ctx.font = 'bold 10px sans-serif';
        ctx.fillStyle = '#838383';
        ctx.textBaseline = 'middle';
        const titleX = width / 2 - ctx.measureText(centerLabel.title).width / 2;
        const titleY = height / 2 - 10;
        ctx.fillText(centerLabel.title, titleX, titleY);

        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = '#838383';
        const valueX = width / 2 - ctx.measureText(centerLabel.value).width / 2;
        const valueY = height / 2 + 12;
        ctx.fillText(centerLabel.value, valueX, valueY);

        ctx.save();
      }
    },
  };

  // ✅ Slice label plugin remains the same
  const sliceLabelPlugin = {
    id: 'sliceLabels',
    afterDatasetsDraw: (chart: any) => {
      if (!showSliceLabels) return;

      const { ctx } = chart;
      ctx.save();

      chart.data.datasets.forEach((dataset: any, i: number) => {
        const meta = chart.getDatasetMeta(i);
        if (!meta.hidden) {
          meta.data.forEach((element: any, index: number) => {
            const { x, y } = element.tooltipPosition();

            const value = dataset.data[index];
            const total = dataset.data.reduce(
              (acc: number, val: number) => acc + val,
              0
            );
            const percent = ((value / total) * 100).toFixed(0) + '%';

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.fillText(`${percent}`, x, y - 8);
            ctx.fillText(`${value.toLocaleString()}`, x, y + 8);
          });
        }
      });

      ctx.restore();
    },
  };

  return (
    <Flex width="full" height={height ?? '100px'}>
      <Doughnut
        data={data}
        options={options}
        plugins={[centerTextPlugin, sliceLabelPlugin]}
      />
    </Flex>
  );
};

export default DoughtnutChart;
