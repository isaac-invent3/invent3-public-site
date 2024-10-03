import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Flex } from '@chakra-ui/react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const data = {
    labels: ['0', '10', '15', '20', '25', '30', '35', '40'],
    datasets: [
      {
        label: 'Performance',
        data: [20, 25, 35, 40, 30, 36, 20, 10],
        backgroundColor: '#00A12933',
        borderColor: '#6CF892',
        borderWidth: 2,
        pointBackgroundColor: '#6CF892',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: '#fff',
        },
        grid: {
          circular: true,
          color: '#fff',
        },
        ticks: {
          display: false,
          stepSize: 10,
        },
        suggestedMin: 0,
        suggestedMax: 40,
        pointLabels: {
          color: '#fff',
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <Flex width="full" height="full">
      <Radar data={data} options={options} />
    </Flex>
  );
};

export default RadarChart;
