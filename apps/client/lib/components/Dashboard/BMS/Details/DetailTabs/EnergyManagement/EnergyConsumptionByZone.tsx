import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import PieChart from '~/lib/components/Dashboard/Common/Charts/PieChart';
import { timeRangeOptions } from '~/lib/utils/constants';
import { Option } from '@repo/interfaces';

const EnergyConsumptionByZone = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );
  const chartLegendItems = [
    {
      label: 'Zone A',
      color: '#07CC3B',
      value: 60,
      consumption: 4000,
    },
    {
      label: 'Zone B',
      color: '#EABC30',
      value: 30,
      consumption: 3000,
    },
    {
      label: 'Zone C',
      color: '#F50000',
      value: 10,
      consumption: 3000,
    },
    {
      label: 'Zone D',
      color: '#17A1FA',
      value: 5,
      consumption: 1500,
    },
  ];
  return (
    <InfoCard
      title="Energy Consumption"
      containerStyle={{
        height: 'full',
        spacing: '40px',
      }}
      selectedTimeRange={selectedTimeRange}
      setSelectedTimeRange={setSelectedTimeRange}
    >
      <HStack width="full" spacing="36px">
        <Flex width={{ base: '80px', lg: '170px' }}>
          <PieChart
            dataValues={chartLegendItems.map((item) => item.value)}
            labels={chartLegendItems.map((item) => item.label)}
            pieLabel="Maintenance"
            backgroundColors={chartLegendItems.map((item) => item.color)}
          />
        </Flex>
        <HStack alignItems="flex-start" spacing="16px">
          <ChartLegend
            chartLegendItems={chartLegendItems}
            containerStyle={{
              spacing: '16px',
              direction: 'column',
            }}
            textStyle={{
              whiteSpace: 'nowrap',
            }}
            boxStyle={{ rounded: 'none' }}
          />
          <VStack alignItems="flex-start" spacing="20px">
            {chartLegendItems.map((item, index) => (
              <Text key={index} fontWeight={700}>
                {item.consumption}kWh
              </Text>
            ))}
          </VStack>
        </HStack>
      </HStack>
    </InfoCard>
  );
};

export default EnergyConsumptionByZone;
