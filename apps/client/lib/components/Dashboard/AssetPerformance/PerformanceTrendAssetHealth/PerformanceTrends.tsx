import { HStack, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import ChartLegend from '../../Common/Charts/ChartLegend';
import { useGetPerformanceTrendsQuery } from '~/lib/redux/services/dashboard/assetperformance.services';
import { useAppSelector } from '~/lib/redux/hooks';
import moment from 'moment';

const PerformanceTrends = () => {
  const filters = useAppSelector((state) => state.common.filters);

  const { data, isLoading, isFetching } = useGetPerformanceTrendsQuery({
    facilityIds: filters?.facilities,
    assetCategoryIds: filters?.assetCategories,
    datePeriod: filters?.datePeriod?.[0],
  });

  // ✅ Extract chart data safely
  const chartData = useMemo(() => {
    if (!data?.data?.length) return [];

    // Use consistent colors for each asset
    const colors = ['#00A129', '#0366EF', '#FF7A37', '#A500FF', '#FFC300'];

    return data.data.map((item, index) => ({
      asset: item.assetName,
      color: colors[index % colors.length],
      values: item.trends.map((trend) => trend.value),
      dates: item.trends.map((trend) => moment(trend.day).format('MMM D')),
    }));
  }, [data]);

  // ✅ Use the first dataset’s dates as chart labels
  const labels = chartData[0]?.dates || [];

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
        <CardHeader>Performance Trends</CardHeader>
        <ChartLegend
          chartLegendItems={chartData.map((item) => ({
            label: item.asset,
            color: item.color!,
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
          datasets={chartData.map((item) => ({
            label: item.asset,
            data: item.values,
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

export default PerformanceTrends;
