import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import BarChart from '../../Common/Charts/BarChart';
import CardHeader from '../../Common/CardHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetCostAnalyticsAverageCostPerAssetCategoryQuery } from '~/lib/redux/services/dashboard/costanalytics.services';

const AverageCostPerCategory = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetCostAnalyticsAverageCostPerAssetCategoryQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      costTypes: filters?.costTypes,
      costPeriod: filters?.datePeriod?.[0],
    });

  const dataItems = [
    {
      label: 'Cost',
      values: data?.data?.map((item) => item.cost) ?? [],
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
        <CardHeader>Average Cost per Asset Category</CardHeader>
      </HStack>
      <BarChart
        labels={data?.data ? data?.data.map((item) => item.category) : []}
        chartData={dataItems}
        isLoading={isLoading || isFetching}
        isStacked={false}
        barRadius={16}
        horizontal
      />
    </VStack>
  );
};

export default AverageCostPerCategory;
