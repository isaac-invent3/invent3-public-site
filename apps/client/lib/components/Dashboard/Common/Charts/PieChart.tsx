import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Flex } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  dataValues: number[];
  labels: string[];
  pieLabel: string;
  backgroundColors: string[];
  height?: string;
}
const PieChart = ({
  dataValues,
  labels,
  backgroundColors,
  //   height,
  pieLabel,
}: PieChartProps) => {
  const total = dataValues.reduce((acc, v) => acc + Number(v), 0);
  const data = {
    labels,
    datasets: [
      {
        label: pieLabel,
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 0,
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
      datalabels: {
        display: true,
        formatter: (value: number) => {
          const pct = total ? (Number(value) / total) * 100 : 0;
          return `${pct.toFixed(1)}%`;
        },
        // Tip: comment this out if a slice is too light to see white text
        color: '#fff',
        font: { weight: 'bold' },
        anchor: 'center',
        align: 'center',
        // clamp: true,
      },
      // (optional) also show % in tooltip
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const v = Number(ctx.parsed);
            const pct = total ? ((v / total) * 100).toFixed(1) : '0.0';
            return `${ctx.label}: ${v} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <Flex width="full" height="full">
      <Pie data={data} options={options} />
    </Flex>
  );
};

export default PieChart;
