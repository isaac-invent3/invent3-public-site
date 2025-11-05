import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import ChartLegend from '../../Common/Charts/ChartLegend';
import BarChart from '../../Common/Charts/BarChart';
import CardHeader from '../../Common/CardHeader';
import { transformMonthIdsToShortNames } from '../../Common/utils';
import { useGetAssetPerformanceReliabilityMetricsQuery } from '~/lib/redux/services/dashboard/assetperformance.services';
import { useAppSelector } from '~/lib/redux/hooks';

const ReliabilityMetrics = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetAssetPerformanceReliabilityMetricsQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      datePeriod: filters?.datePeriod?.[0],
    });
  const chartLegendItems = [
    {
      label: 'Mean Time Between Failures (hrs)',
      color: '#0E2642',
    },
    {
      label: 'Mean Time To Repair (MTTR) (hrs)',
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
        <CardHeader>Reliability Metrics (MTBF / MTTR)</CardHeader>

        <ChartLegend
          chartLegendItems={chartLegendItems}
          containerStyle={{ direction: 'column', spacing: '16px' }}
        />
      </HStack>
      <BarChart
        labels={data?.data ? data?.data.map((item) => item.assetCategory) : []}
        chartData={[
          {
            label: 'Mean Time Between Failures (hrs)',
            values: data?.data?.map((item) => item.mbtf) ?? [],
            color: '#0E2642',
          },
          {
            label: 'Mean Time To Repair (MTTR) (hrs)',
            values: data?.data?.map((item) => item.mttr) ?? [],
            color: '#17A1FA',
          },
        ]}
        isLoading={isLoading || isFetching}
        isStacked={false}
      />
    </VStack>
  );
};

export default ReliabilityMetrics;
