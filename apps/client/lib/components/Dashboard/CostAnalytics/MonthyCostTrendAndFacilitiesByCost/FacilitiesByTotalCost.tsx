import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import ChartLegend from '../../Common/Charts/ChartLegend';
import BarChart from '../../Common/Charts/BarChart';
import CardHeader from '../../Common/CardHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetCostAnalyticsTopFacilitiesByCostQuery } from '~/lib/redux/services/dashboard/costanalytics.services';

const FacilitiesByTotalCost = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetCostAnalyticsTopFacilitiesByCostQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      costTypes: filters?.costTypes,
      costPeriod: filters?.datePeriod?.[0],
    });

  const dataItems = [
    {
      label: 'Cost',
      values: data?.data?.map((item) => item.cost) ?? [],
      color: '#0E2642',
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
        <CardHeader>Top 5 Facilities by Total Cost</CardHeader>

        <ChartLegend
          chartLegendItems={dataItems.map((item) => ({
            label: item.label,
            color: item.color,
          }))}
          containerStyle={{ direction: 'column', spacing: '8px' }}
        />
      </HStack>
      <BarChart
        labels={data?.data ? data?.data.map((item) => item.facility) : []}
        chartData={dataItems}
        isLoading={isLoading || isFetching}
        isStacked={false}
        yLabel="Cost (₦M)"
      />
    </VStack>
  );
};

export default FacilitiesByTotalCost;
