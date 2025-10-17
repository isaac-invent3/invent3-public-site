import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import DoughtnutChart from '~/lib/components/Dashboard/Common/Charts/DoughtnutChart';

const TicketDistributionBySkillGroup = () => {
  const isLoading = false;
  const chartLegendItems = [
    {
      label: 'Electrical',
      color: '#0E2642',
      value: 50,
    },
    {
      label: 'Plumbing',
      color: '#EABC30',
      value: 90,
    },
    {
      label: 'General',
      color: '#0366EF',
      value: 100,
    },
  ];

  return (
    <VStack
      width="full"
      height="full"
      p={4}
      alignItems="flex-start"
      spacing="34px"
      bgColor="white"
      rounded="8px"
      minH="357px"
    >
      <CardHeader>Technician Load Distribution</CardHeader>
      <HStack width="full" alignItems="flex-start">
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
        <Flex width="full" justifyContent="center">
          {isLoading && (
            <Skeleton width="236px" height="236px" rounded="full" />
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
              height="236px"
              cutout="45%"
              showSliceLabels={true}
            />
          )}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default TicketDistributionBySkillGroup;
