import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import ChartLegend from '../../Common/Charts/ChartLegend';
import DoughtnutChart from '../../Common/Charts/DoughtnutChart';

const TicketCreationSource = () => {
  const isLoading = false;

  const chartLegendItems = [
    {
      label: 'Manual Entry',
      color: '#0366EF',
      value: 485,
    },
    {
      label: 'Auto-generated',
      color: '#0E2642',
      value: 720,
    },
  ];

  return (
    <VStack
      width="full"
      height="full"
      minH="300px"
      p="16px"
      alignItems="flex-start"
      spacing="18px"
      bgColor="white"
      rounded="8px"
      maxH="375px"
    >
      <CardHeader>Ticket Creation Source</CardHeader>
      <HStack
        width="full"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="flex-start"
      >
        <ChartLegend
          chartLegendItems={chartLegendItems}
          containerStyle={{
            direction: 'column',
            spacing: '6px',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
          }}
        />
        <Flex width="full">
          {isLoading && (
            <Skeleton width="206px" height="206px" rounded="full" />
          )}
          {!isLoading && (
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
              height="206px"
              cutout="45%"
              showSliceLabels={true}
              tooltipFormatter={(value, total) => {
                const percent = ((value / total) * 100).toFixed(0);
                return [
                  `Percentage: ${percent}%`,
                  `Count: ${value.toLocaleString()}`,
                ];
              }}
            />
          )}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default TicketCreationSource;
