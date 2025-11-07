import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import ChartLegend from '../../Common/Charts/ChartLegend';
import DoughtnutChart from '../../Common/Charts/DoughtnutChart';
import { formatNumberShort } from '~/lib/utils/helperFunctions';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetCostAnalyticsDashboardCostBreakdownByTypeQuery } from '~/lib/redux/services/dashboard/costanalytics.services';

const CostBreakDownByType = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetCostAnalyticsDashboardCostBreakdownByTypeQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      costTypes: filters?.costTypes,
      costPeriod: filters?.datePeriod?.[0],
    });

  const chartLegendItems = [
    {
      label: 'Preventive Maintenance',
      color: '#17A1FA',
      value: data?.data?.breakdown?.preventive ?? 0,
    },
    {
      label: 'Corrective Repairs',
      color: '#EABC30',
      value: data?.data?.breakdown?.corrective ?? 0,
    },
    {
      label: 'Energy',
      color: '#0E2642',
      value: data?.data?.breakdown?.energy ?? 0,
    },
  ];

  return (
    <VStack
      width="full"
      height="full"
      minH="300px"
      p="16px"
      alignItems="flex-start"
      spacing="18px"
      bgColor="white"
      rounded="8px"
      maxH="375px"
    >
      <CardHeader>Cost Breakdown by Type</CardHeader>
      <HStack
        width="full"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="flex-start"
      >
        <ChartLegend
          chartLegendItems={chartLegendItems}
          containerStyle={{
            direction: 'column',
            spacing: '6px',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
          }}
        />
        <Flex width="276px">
          {(isLoading || isFetching) && (
            <Skeleton width="276px" height="276px" rounded="full" />
          )}
          {!isLoading && !isFetching && (
            <DoughtnutChart
              labels={chartLegendItems.map((item) => item.label)}
              datasets={[
                {
                  data: chartLegendItems.map((item) => item.value ?? 0),
                  backgroundColor: chartLegendItems.map((item) => item.color),
                  borderWidth: 0,
                },
              ]}
              type="full"
              height="276px"
              cutout="50%"
              showSliceLabels={true}
              tooltipFormatter={(value, total, label) => {
                const percent = ((value / total) * 100).toFixed(0);
                return [
                  `Cost Percentage: ${percent}%`,
                  `Cost Score: ${value.toLocaleString()}`,
                ];
              }}
            />
          )}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default CostBreakDownByType;
