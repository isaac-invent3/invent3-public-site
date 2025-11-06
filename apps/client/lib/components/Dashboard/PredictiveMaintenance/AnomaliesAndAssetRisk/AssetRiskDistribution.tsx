import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import ChartLegend from '../../Common/Charts/ChartLegend';
import DoughtnutChart from '../../Common/Charts/DoughtnutChart';
import { formatNumberShort } from '~/lib/utils/helperFunctions';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetPredictiveMaintenanceDashboardAssetRiskDistributionQuery } from '~/lib/redux/services/dashboard/predictivemaintenance.services';

const AssetRiskDistribution = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetPredictiveMaintenanceDashboardAssetRiskDistributionQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      datePeriod: filters?.datePeriod?.[0],
      riskThreshold: filters?.datePeriod?.[0],
    });

  const chartLegendItems = [
    {
      label: 'High Risk (81-100%)',
      color: '#17A1FA',
      value: data?.data?.highRisk?.count ?? 0,
    },
    {
      label: 'Medium Risk (41-80%)',
      color: '#EABC30',
      value: data?.data?.mediumRisk?.count ?? 0,
    },
    {
      label: 'Low Risk (0-40%)',
      color: '#0E2642',
      value: data?.data?.lowRisk?.count ?? 0,
    },
  ];
  const totalAsset = data?.data?.totalAssets ?? 0;

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
      <CardHeader>Asset Risk Distribution</CardHeader>
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
        <Flex width="full">
          {(isLoading || isFetching) && (
            <Skeleton width="206px" height="206px" rounded="full" />
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
              height="206px"
              cutout="50%"
              centerLabel={{
                title: 'Total Assets',
                value: formatNumberShort(totalAsset),
              }}
              showSliceLabels={true}
              tooltipFormatter={(value, total, label) => {
                const percent = ((value / total) * 100).toFixed(0);
                return [
                  `Risk Percentage: ${percent}%`,
                  `Risk Score: ${value.toLocaleString()}`,
                ];
              }}
            />
          )}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default AssetRiskDistribution;
