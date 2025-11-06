import { HStack, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import BubbleChart from '../../Common/Charts/BubbleChart';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetPerformancePredictiveRiskLevelQuery } from '~/lib/redux/services/dashboard/assetperformance.services';

// Helper to format currency nicely (1.5M, 750k, etc.)
const formatCurrency = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
  return `${value}`;
};

const PredictiveRiskLevels = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetAssetPerformancePredictiveRiskLevelQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      datePeriod: filters?.datePeriod?.[0],
    });

  const chartData = data?.data ?? [];

  // Predefined bubble colors
  const colors = [
    'rgba(255, 99, 132, 0.6)', // Red
    'rgba(54, 162, 235, 0.6)', // Blue
    'rgba(255, 206, 86, 0.6)', // Yellow
    'rgba(75, 192, 192, 0.6)', // Teal
    'rgba(153, 102, 255, 0.6)', // Purple
  ];

  // Map the API data to bubble points
  const bubbleData = useMemo(() => {
    if (!chartData.length) return [];

    const minCost = Math.min(...chartData.map((d: any) => d.assetCostValue));
    const maxCost = Math.max(...chartData.map((d: any) => d.assetCostValue));

    return chartData.map((item: any, i: number) => {
      // Normalize radius (so larger asset cost → larger bubble)
      const normalizedR =
        ((item.assetCostValue - minCost) / (maxCost - minCost || 1)) * 15 + 8;

      return {
        x: item.conditionIndex,
        y: item.riskScore,
        r: normalizedR,
        color: colors[i % colors.length],
        label: `${item.facility}\n${formatCurrency(item.assetCostValue)}`,
        amountLabel: formatCurrency(item.assetCostValue),
      };
    });
  }, [chartData]);

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
        <CardHeader>Predictive Risk Levels by Facility (Top 5)</CardHeader>
      </HStack>

      <VStack
        width="full"
        height="full"
        alignItems="flex-start"
        spacing="34px"
        justifyContent="space-between"
      >
        <BubbleChart
          isLoading={isLoading || isFetching}
          xLabel="Condition Index"
          yLabel="Risk Score"
          datasets={[
            {
              label: 'Facilities',
              data: bubbleData,
            },
          ]}
          showYGrid={false}
        />
      </VStack>
    </VStack>
  );
};

export default PredictiveRiskLevels;
