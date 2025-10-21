import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import DoughtnutChart from '~/lib/components/Dashboard/Common/Charts/DoughtnutChart';
import { useGetTicketDistributionBySkillGroupQuery } from '~/lib/redux/services/ticket.services';
import { generateColor } from '~/lib/utils/helperFunctions';

const TicketDistributionBySkillGroup = () => {
  const { data, isLoading } = useGetTicketDistributionBySkillGroupQuery();
  const chartLegendItems =
    data?.data?.map((item, index) => ({
      label: item.name ?? 'N/A',
      color: generateColor(index),
      value: item.distributionPercentage,
    })) ?? [];

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
      <CardHeader>Ticket Distribution By Skill Group</CardHeader>
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
