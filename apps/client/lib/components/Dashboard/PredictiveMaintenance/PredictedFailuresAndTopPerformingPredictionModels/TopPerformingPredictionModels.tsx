import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import ChartLegend from '../../Common/Charts/ChartLegend';
import BarChart from '../../Common/Charts/BarChart';
import CardHeader from '../../Common/CardHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetPredictiveMaintenanceDashboardTopPerformingModelsQuery } from '~/lib/redux/services/dashboard/predictivemaintenance.services';

const TopPerformingPredictionModels = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetPredictiveMaintenanceDashboardTopPerformingModelsQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      datePeriod: filters?.datePeriod?.[0],
      riskThreshold: filters?.datePeriod?.[0],
    });
  const dataItems = [
    {
      label: 'Model',
      values: data?.data?.map((item) => item.accuracy) ?? [],
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
        <CardHeader>Top Performing Prediction Models</CardHeader>

        <ChartLegend
          chartLegendItems={dataItems.map((item) => ({
            label: item.label,
            color: item.color,
          }))}
          containerStyle={{ direction: 'column', spacing: '8px' }}
        />
      </HStack>
      <BarChart
        labels={data?.data ? data?.data.map((item) => item.model) : []}
        chartData={dataItems}
        isLoading={isLoading || isFetching}
        isStacked={false}
        horizontal
        barRadius={16}
      />
    </VStack>
  );
};

export default TopPerformingPredictionModels;
