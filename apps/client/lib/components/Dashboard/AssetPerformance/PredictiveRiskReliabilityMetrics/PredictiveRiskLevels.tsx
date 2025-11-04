import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';

const PredictiveRiskLevels = () => {
  const data = [
    {
      asset: 'HVAC',
      color: '#00A129',
      value: [10, 20, 40, 50, 70],
    },
    {
      asset: 'Generator',
      color: '#0366EF',
      value: [15, 25, 35, 45, 60],
    },
    {
      asset: 'Pump',
      color: '#FF7A37',
      value: [20, 30, 40, 60, 80],
    },
  ];

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
        <CardHeader>Predictive Risk Levels by Facility (Top 5)</CardHeader>
      </HStack>
      <VStack
        width="full"
        height="full"
        alignItems="flex-start"
        spacing="34px"
        justifyContent="space-between"
      >
        {/* <ChartLegend chartLegendItems={chartLegendItems} /> */}
        <LineChart
          labels={['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20']}
          datasets={
            data
              ? data?.map((item) => ({
                  label: 'Trend',
                  data: item?.value.map((item) => item),
                  borderColor: item.color,
                  borderWidth: 2,
                  tension: 0.4,
                  fill: false,
                }))
              : []
          }
          isLoading={false}
          showYGrid={false}
        />
      </VStack>
    </VStack>
  );
};

export default PredictiveRiskLevels;
