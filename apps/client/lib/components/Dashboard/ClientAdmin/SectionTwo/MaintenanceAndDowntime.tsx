import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import CardHeader from '../../Common/CardHeader';
import DropDown from '../../Common/DropDown';
import ChartLegend from '../../Common/Charts/ChartLegend';
import PieChart from '../../Common/Charts/PieChart';
const chartLegendItems = [
  {
    label: 'Maintenance',
    color: '#00A129',
    children: (
      <Text
        color="neutral.600"
        fontSize="10px"
        lineHeight="11.88px"
        fontWeight={700}
      >
        45%
      </Text>
    ),
  },
  {
    label: 'Downtime',
    color: '#0366EF',
    children: (
      <Text
        color="neutral.600"
        fontSize="10px"
        lineHeight="11.88px"
        fontWeight={700}
      >
        50%
      </Text>
    ),
  },
];

const MaintenanceAndDowntimeChart = () => {
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
        <CardHeader>Maintenance vs DownTime</CardHeader>
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
          labels={chartLegendItems.map((item) => item.label)}
          pieLabel="Maintenance"
          backgroundColors={chartLegendItems.map((item) => item.color)}
        />
      </VStack>
    </VStack>
  );
};

export default MaintenanceAndDowntimeChart;
