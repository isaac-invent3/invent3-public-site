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

export default function BranchAssetsChart() {
  const labels = [
    'Lekki - Admiralty Road',
    'Lekki - Admiralty Way',
    'Oniru',
    'Chisco',
    'Chevron',
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        axis: 'y',
        label: 'My First Dataset',
        data: [25, 20, 15, 10, 5],
        fill: true,
        backgroundColor: [
          '#98FEFE',
          '#D1AFC7',
          '#E4FEFE',
          '#F7F7F7',
          '#6E7D8E',
        ],
        borderColor: ['#2C2C2C', '#2C2C2C', '#2C2C2C', '#2C2C2C', '#2C2C2C'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      ml="16px"
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
          <Bar
            data={data}
            options={{
              indexAxis: 'y',
            }}
          />
        </Box>
      </HStack>
    </Box>
  );
}
