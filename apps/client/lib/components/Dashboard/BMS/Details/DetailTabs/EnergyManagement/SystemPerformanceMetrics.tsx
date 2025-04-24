import React from 'react';
import InfoCard from '../../../InfoCard';
import { Flex, Text, VStack } from '@chakra-ui/react';
import DoughtnutChart from '~/lib/components/Dashboard/Common/Charts/DoughtnutChart';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';

const SystemPerformanceMetrics = () => {
  const chartLegendItems = [
    {
      label: 'High',
      color: '#07CC3B',
      value: 60,
      children: <Text fontWeight={700}>60%</Text>,
    },
    {
      label: 'Medium',
      color: '#EABC30',
      value: 30,
      children: <Text fontWeight={700}>30%</Text>,
    },
    {
      label: 'Low',
      color: '#F50000',
      value: 10,
      children: <Text fontWeight={700}>10%</Text>,
    },
  ];
  return (
    <InfoCard
      title="System Performance Metric"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
    >
      <VStack width="full" spacing="36px">
        <Flex width={{ base: '80px', lg: '170px' }}>
          <DoughtnutChart
            labels={chartLegendItems.map((item) => item.label)}
            datasets={[
              {
                data: chartLegendItems.map((item) => item.value ?? 0),
                backgroundColor: chartLegendItems.map((item) => item.color),
                borderWidth: 0,
              },
            ]}
            type="full"
            height="170px"
            cutout="60%"
          />
        </Flex>
        <Flex width="full">
          <ChartLegend
            chartLegendItems={chartLegendItems}
            containerStyle={{
              spacing: '27px',
              mt: '13px',
            }}
            textStyle={{
              whiteSpace: 'nowrap',
            }}
            boxStyle={{ rounded: 'none' }}
          />
        </Flex>
      </VStack>
    </InfoCard>
  );
};

export default SystemPerformanceMetrics;
