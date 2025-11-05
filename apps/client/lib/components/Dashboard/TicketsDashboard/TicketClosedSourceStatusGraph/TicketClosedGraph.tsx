import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import ChartLegend from '../../Common/Charts/ChartLegend';
import BarChart from '../../Common/Charts/BarChart';
import CardHeader from '../../Common/CardHeader';
import { transformMonthIdsToShortNames } from '../../Common/utils';
import { useGetSuperAdminSubscriptionTrendQuery } from '~/lib/redux/services/dashboard/superadmin.services';

const TicketClosedGraph = () => {
  const { data, isLoading } = useGetSuperAdminSubscriptionTrendQuery();
  const dataItems = [
    {
      label: 'Within SLA',
      values: data?.data?.map((item) => item.paid) ?? [],
      color: '#0E2642',
    },
    {
      label: 'Late',
      values: data?.data?.map((item) => item.free) ?? [],
      color: '#17A1FA',
    },
  ];

  return (
    <VStack
      height="full"
      p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <CardHeader>Tickets Closed per Technician - Top 5</CardHeader>

        <ChartLegend
          chartLegendItems={dataItems.map((item) => ({
            label: item.label,
            color: item.color,
          }))}
          containerStyle={{ direction: 'column', spacing: '8px' }}
        />
      </HStack>
      <BarChart
        labels={
          data?.data
            ? transformMonthIdsToShortNames(
                data?.data.map((item) => item.monthId)
              )
            : []
        }
        chartData={dataItems}
        isLoading={isLoading}
        isStacked={false}
      />
    </VStack>
  );
};

export default TicketClosedGraph;
