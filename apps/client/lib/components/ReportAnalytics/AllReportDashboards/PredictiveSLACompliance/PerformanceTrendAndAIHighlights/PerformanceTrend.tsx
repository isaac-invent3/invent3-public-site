import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { useAppSelector } from '~/lib/redux/hooks';
import moment from 'moment';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import { useGetPredictiveSlaDashboardTrendsQuery } from '~/lib/redux/services/prediction.services';

const PerformanceTrends = () => {
  const filters = useAppSelector((state) => state.common.filters);

  const { data, isLoading, isFetching } =
    useGetPredictiveSlaDashboardTrendsQuery({
      datePeriod: filters?.datePeriod?.[0],
    });

  const chartData = [
    {
      label: 'SLA Met',
      color: '#00A129',
      values: data?.data?.map((item) => item.onTime),
    },
    {
      label: 'SLA at Risk',
      color: '#FF881B',
      values: data?.data?.map((item) => item.atRisk),
    },
    {
      label: 'SLA Breached',
      color: '#F50000',
      values: data?.data?.map((item) => item.breached),
    },
  ];

  // Use the first dataset’s dates as chart labels
  const labels =
    data?.data?.map((item) => moment.utc(item.day).isoWeek().toString()) || [];

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
        <CardHeader>Predictive SLA Performance Over Time</CardHeader>
        <ChartLegend
          chartLegendItems={chartData.map((item) => ({
            label: item.label,
            color: item.color!,
          }))}
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
          datasets={chartData.map((item) => ({
            label: item.label,
            data: item.values ?? [],
            borderColor: item.color,
            borderWidth: 2,
            tension: 0.4,
            fill: false,
          }))}
          isLoading={isLoading || isFetching}
          showYGrid={false}
          showDots={false}
          yLabel="Compliance Rate (%)"
          xLabel="Weeks"
        />
      </VStack>
    </VStack>
  );
};

export default PerformanceTrends;
