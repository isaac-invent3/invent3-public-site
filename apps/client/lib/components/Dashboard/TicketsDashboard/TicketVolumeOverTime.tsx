import { HStack, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import ChartLegend from '../Common/Charts/ChartLegend';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetTicketPerformanceDashboardPerformanceTrendsQuery } from '~/lib/redux/services/dashboard/ticketDashboard.services';
import { PerformanceTrend } from '~/lib/interfaces/dashboard/ticket.interfaces';

const STATUS_COLORS: Record<string, string> = {
  Closed: '#00A129',
  Created: '#0366EF',
  Overdue: '#F50000',
};

const TicketVolumeOverTime = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetTicketPerformanceDashboardPerformanceTrendsQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      ticketTypes: filters?.ticketTypes,
      datePeriod: filters?.datePeriod?.[0],
    });

  // ✅ Transform API response into chart-friendly format
  const dataItems = useMemo(() => {
    if (!data?.data) return [];

    return Object.entries(data.data).map(([status, entries]) => ({
      asset: status,
      color: STATUS_COLORS[status] || '#999',
      value: entries.map((entry: PerformanceTrend) => entry.value),
      days: entries.map((entry: PerformanceTrend) => entry.day),
    }));
  }, [data]);

  const labels =
    dataItems[0]?.days?.map((day: Date) =>
      new Date(day).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    ) || [];

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
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <CardHeader>Ticket Volume Over Time</CardHeader>
        <ChartLegend
          chartLegendItems={dataItems.map((item) => ({
            label: item.asset,
            color: item.color,
          }))}
          showSecondaryLine
          containerStyle={{ direction: 'column', spacing: '4px' }}
        />
      </HStack>

      <VStack
        width="full"
        height="full"
        alignItems="flex-start"
        spacing="34px"
        justifyContent="space-between"
      >
        <LineChart
          labels={labels}
          datasets={dataItems.map((item) => ({
            label: item.asset,
            data: item.value,
            borderColor: item.color,
            borderWidth: 2,
            tension: 0.4,
            fill: false,
          }))}
          isLoading={isLoading || isFetching}
          showYGrid={false}
          showDots={false}
        />
      </VStack>
    </VStack>
  );
};

export default TicketVolumeOverTime;
