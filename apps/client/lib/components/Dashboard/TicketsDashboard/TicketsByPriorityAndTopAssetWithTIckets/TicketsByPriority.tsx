import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import ChartLegend from '../../Common/Charts/ChartLegend';
import BarChart from '../../Common/Charts/BarChart';
import CardHeader from '../../Common/CardHeader';
import { transformMonthIdsToShortNames } from '../../Common/utils';
import { useGetTicketByPriorityLevelQuery } from '~/lib/redux/services/dashboard/ticketDashboard.services';
import { useAppSelector } from '~/lib/redux/hooks';

const TicketsByPriority = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } = useGetTicketByPriorityLevelQuery({
    facilityIds: filters?.facilities,
    assetCategoryIds: filters?.assetCategories,
    ticketTypes: filters?.ticketTypes,
    datePeriod: filters?.datePeriod?.[0],
  });
  const dataItems = [
    {
      label: 'Completed',
      values: data?.data?.map((item) => item.completed) ?? [],
      color: '#EABC30',
    },
    {
      label: 'In Progress',
      values: data?.data?.map((item) => item.inProgress) ?? [],
      color: '#17A1FA',
    },
    {
      label: 'Open',
      values: data?.data?.map((item) => item.open) ?? [],
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
        labels={data?.data ? data?.data.map((item) => item.priorityLevel) : []}
        chartData={dataItems.reverse()}
        isLoading={isLoading || isFetching}
        isStacked
      />
    </VStack>
  );
};

export default TicketsByPriority;
