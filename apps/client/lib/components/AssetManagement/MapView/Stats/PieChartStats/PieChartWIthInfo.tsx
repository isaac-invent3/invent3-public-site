import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartWithInfoProps {
  label: string;
  mainValue: number;
  totalValue: number;
}

const PieChartWithInfo = (props: PieChartWithInfoProps) => {
  const { label, mainValue, totalValue } = props;

  const data = {
    labels: [''],
    datasets: [
      {
        label: '',
        data: [mainValue, totalValue],
        backgroundColor: ['#BBBBBB', '#838383'],
        hoverBackgroundColor: ['#BBBBBB', '#838383'],
        border: 0,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend labels
      },
      tooltip: {
        enabled: false, // Disable tooltips if not needed
      },
    },
    elements: {
      arc: {
        borderWidth: 0, // Set border width to 0 to remove borders from pie chart
      },
    },
  };

  return (
    <HStack alignItems="flex-start" width="full">
      <Box maxW="35px">
        <Pie data={data} options={options} />
      </Box>
      <VStack alignItems="flex-start" spacing="2px">
        <Text fontWeight={700} size="lg">
          {mainValue.toLocaleString()}
        </Text>
        <Text color="neutral.600">{label}</Text>
      </VStack>
    </HStack>
  );
};

export default PieChartWithInfo;
