import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Flex } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface MaintenancePieChartProps {
  value: [number, number];
}
const MaintenancePieChart = ({ value }: MaintenancePieChartProps) => {
  const data = {
    labels: ['Missed', 'Completed'],
    datasets: [
      {
        label: 'Maintenance',
        data: value,
        backgroundColor: ['#00A129', '#0F2540'],
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
    <Flex width="full" height="200px">
      <Pie data={data} options={options} />
    </Flex>
  );
};

export default MaintenancePieChart;
