import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import CardHeader from '../../../Common/CardHeader';
import DropDown from '../../../Common/DropDown';
import ChartLegend from '../../../Common/Charts/ChartLegend';
import MaintenancePieChart from './PieChart';

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

const MaintenanceSuccess = () => {
  return (
    <VStack
      width="full"
      height="full"
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
        <MaintenancePieChart value={[300, 700]} />
      </VStack>
    </VStack>
  );
};

export default MaintenanceSuccess;
