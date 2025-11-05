import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import ChartLegend from '../../Common/Charts/ChartLegend';
import BarChart from '../../Common/Charts/BarChart';
import CardHeader from '../../Common/CardHeader';
import { transformMonthIdsToShortNames } from '../../Common/utils';
import { useGetSuperAdminSubscriptionTrendQuery } from '~/lib/redux/services/dashboard/superadmin.services';

const TicketsByPriority = () => {
  const { data, isLoading } = useGetSuperAdminSubscriptionTrendQuery();
  const dataItems = [
    {
      label: 'Completed',
      values: data?.data?.map((item) => item.paid) ?? [],
      color: '#EABC30',
    },
    {
      label: 'In Progress',
      values: data?.data?.map((item) => item.free) ?? [],
      color: '#17A1FA',
    },
    {
      label: 'Open',
      values: data?.data?.map((item) => item.free) ?? [],
      color: '#0E2642',
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
        <CardHeader>Tickets by Priority Level</CardHeader>

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
        chartData={dataItems.reverse()}
        isLoading={isLoading}
        isStacked
      />
    </VStack>
  );
};

export default TicketsByPriority;
