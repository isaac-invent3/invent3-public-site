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
import { FacilityWithTopAssets } from '~/lib/interfaces/report.interfaces';
import { formatNumberShort } from '~/lib/utils/helperFunctions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement
);

interface BranchesWithTopAssetsProps {
  topFiveBranchesWithAssets: FacilityWithTopAssets[];
  totalAssets: number | undefined;
}

const BranchesWithTopAssetsChart = (props: BranchesWithTopAssetsProps) => {
  const { topFiveBranchesWithAssets, totalAssets } = props;

  const labels = topFiveBranchesWithAssets.map((item) => item.facilityName);

  const dataValues = topFiveBranchesWithAssets.map((item) => item.totalAssets);

  const data = {
    labels: labels,
    datasets: [
      {
        axis: 'y',
        label: 'My First Dataset',
        data: dataValues,
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
      bg="white"
      p="16px"
      borderRadius="md"
      border="1px solid #F2F1F1"
      height="100%"
      w={{ base: 'full' , md:'50%'}}
    >
      <HStack alignItems="start" height="100%">
        <VStack justifyContent="space-between" alignItems="start" height="30%">
          <Text size="md" color="#42403D" mb="10">
            Top 5 branches with most Assets
          </Text>

          <Box>
            <Text fontSize="28px" fontWeight="800" color="#0E2642">
              {totalAssets && formatNumberShort(totalAssets)}
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
};

export default BranchesWithTopAssetsChart;
