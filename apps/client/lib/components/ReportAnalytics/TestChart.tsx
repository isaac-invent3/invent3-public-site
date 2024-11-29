import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement
);

interface Branch {
  name: string;
  value: number;
  color: string;
}

const branches: Branch[] = [
  {
    name: 'Lekki - Admiralty Road',
    value: 250,
    color: 'rgba(147, 237, 248, 0.5)',
  },
  {
    name: 'Lekki - Admiralty Way',
    value: 200,
    color: 'rgba(206, 185, 223, 0.6)',
  },
  { name: 'Oniru', value: 150, color: 'rgba(147, 237, 248, 0.3)' },
  { name: 'Chisco', value: 100, color: 'white' },
  { name: 'Chevron', value: 50, color: 'rgba(156, 156, 156, 0.6)' },
];

export default function BranchAssetsChart() {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        axis: 'y',
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      width="48%"
      bg="white"
      p="16px"
      borderRadius="md"
      border="1px solid #F2F1F1"
      height="100%"
    >
      <HStack alignItems="start" height="100%">
        <VStack justifyContent="space-between" alignItems="start" height="30%">
          <Text fontSize="14px" color="#42403D" mb="10">
            Top 5 branches with most Assets
          </Text>

          <Box>
            <Text fontSize="28px" fontWeight="800" color="#0E2642">
              750k
            </Text>

            <Text fontWeight="700" color="#838383" mt="2">
              Total Assets
            </Text>
          </Box>
        </VStack>

        <Box width="full" height="full">
          <Bar data={data} options={{ indexAxis: 'y' }}  />
        </Box>
      </HStack>
    </Box>
  );
}
