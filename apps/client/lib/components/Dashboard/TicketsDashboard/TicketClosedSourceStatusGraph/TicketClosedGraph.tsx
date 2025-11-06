import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import ChartLegend from '../../Common/Charts/ChartLegend';
import BarChart from '../../Common/Charts/BarChart';
import CardHeader from '../../Common/CardHeader';
import { useGetTicketClosedByTechnicianQuery } from '~/lib/redux/services/dashboard/ticketDashboard.services';
import { useAppSelector } from '~/lib/redux/hooks';

const TicketClosedGraph = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } = useGetTicketClosedByTechnicianQuery({
    facilityIds: filters?.facilities,
    assetCategoryIds: filters?.assetCategories,
    ticketTypes: filters?.ticketTypes,
    datePeriod: filters?.datePeriod?.[0],
  });
  const dataItems = [
    {
      label: 'Within SLA',
      values: data?.data?.map((item) => item.withinSla) ?? [],
      color: '#0E2642',
    },
    {
      label: 'Late',
      values: data?.data?.map((item) => item.breached) ?? [],
      color: '#17A1FA',
    },
  ];

  return (
    <VStack
      height="full"
      width="full"
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
        labels={data?.data ? data?.data.map((item) => item.technician) : []}
        chartData={dataItems}
        isLoading={isLoading || isFetching}
        isStacked={false}
      />
    </VStack>
  );
};

export default TicketClosedGraph;
