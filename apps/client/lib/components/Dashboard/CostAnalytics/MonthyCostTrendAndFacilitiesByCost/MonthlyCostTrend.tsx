import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetCostAnalyticsMonthlyCostTrendQuery } from '~/lib/redux/services/dashboard/costanalytics.services';
import ChartLegend from '../../Common/Charts/ChartLegend';

const MonthlyCostTrend = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetCostAnalyticsMonthlyCostTrendQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      costTypes: filters?.costTypes,
      costPeriod: filters?.datePeriod?.[0],
    });

  const dataItems = [
    {
      label: 'Maintenance',
      values: data?.data?.trendData?.map((item) => item.maintenance) ?? [],
      color: '#17A1FA',
    },
    {
      label: 'Energy',
      values: data?.data?.trendData?.map((item) => item.energy) ?? [],
      color: '#F39B6E',
    },
    {
      label: 'Labor',
      values: data?.data?.trendData?.map((item) => item.labor) ?? [],
      color: '#FFCC00',
    },
    {
      label: 'Predictive Savings',
      values: data?.data?.trendData?.map((item) => item.labor) ?? [],
      color: '#0E2642',
    },
  ];

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
        <CardHeader>Monthly Cost Trend (₦M)</CardHeader>
        <ChartLegend
          chartLegendItems={dataItems.map((item) => ({
            label: item.label,
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
          labels={data?.data?.trendData?.map((item) => item.month) ?? []}
          datasets={dataItems.map((item) => ({
            label: item.label,
            data: item.values,
            borderColor: item.color,
            borderWidth: 2,
            tension: 0.4,
            fill: false,
          }))}
          isLoading={isLoading || isFetching}
          showYGrid={false}
          showDots={false}
          yLabel="Cost (₦M)"
        />
      </VStack>
    </VStack>
  );
};

export default MonthlyCostTrend;
