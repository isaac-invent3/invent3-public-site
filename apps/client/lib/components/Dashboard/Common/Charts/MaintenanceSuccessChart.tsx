import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import CardHeader from '../CardHeader';
import DropDown from '../DropDown';
import ChartLegend from './ChartLegend';
import PieChart from './PieChart';

const chartLegendItems = [
  {
    label: 'Missed',
    color: '#00A129',
    children: (
      <Text fontSize="10px" lineHeight="11.88px">
        300
        <Text
          as="span"
          color="neutral.600"
          fontSize="10px"
          lineHeight="11.88px"
        >
          {' '}
          . 45%
        </Text>
      </Text>
    ),
  },
  {
    label: 'Completed',
    color: '#033376',
    children: (
      <Text fontSize="10px" lineHeight="11.88px">
        300
        <Text
          as="span"
          color="neutral.600"
          fontSize="10px"
          lineHeight="11.88px"
        >
          {' '}
          . 45%
        </Text>
      </Text>
    ),
  },
];

interface MaintenanceSuccessChartProps {
  missedColorCode: string;
  completedColorCode: string;
}

const MaintenanceSuccessChart = ({
  missedColorCode,
  completedColorCode,
}: MaintenanceSuccessChartProps) => {
  return (
    <VStack
      width="full"
      minH="full"
      p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Maintenance Success</CardHeader>
        <DropDown
          options={generateLastFiveYears()}
          label="Year"
          handleClick={() => {}}
          selectedOptions={null}
          width="100px"
        />
      </HStack>
      <VStack width="full" alignItems="flex-start" spacing="37px">
        <ChartLegend chartLegendItems={chartLegendItems} />
        <PieChart
          dataValues={[300, 700]}
          labels={['Missed', 'Completed']}
          pieLabel="Maintenance"
          backgroundColors={[missedColorCode, completedColorCode]}
        />
      </VStack>
    </VStack>
  );
};

export default MaintenanceSuccessChart;
