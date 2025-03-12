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
    },
  };

  return (
    <Flex width="full" height="full">
      <Pie data={data} options={options} />
    </Flex>
  );
};

export default PieChart;
