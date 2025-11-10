import { VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { useGetAssetFailureTrendQuery } from '~/lib/redux/services/dashboard/ai';

const AssetFailureProbabilityTrend = () => {
  const { data, isLoading, isFetching } = useGetAssetFailureTrendQuery();

  // ✅ Transform API response into chart-friendly format
  const dataItems = useMemo(() => {
    if (!data?.data) return [];

    return [
      {
        label: 'Probability',
        value: data?.data?.map((item) => item.probability) || [],
        color: '#F50000',
      },
    ];
  }, [data]);

  const labels = data?.data?.map((item) => item.month) || [];

  return (
    <VStack width="full" height="full" alignItems="flex-start" spacing="66px">
      <CardHeader>Asset Failure Probability Trend</CardHeader>
      <VStack
        width="full"
        height="full"
        alignItems="flex-start"
        spacing="34px"
        justifyContent="space-between"
      >
        <LineChart
          labels={labels}
          datasets={dataItems.map((item) => ({
            label: item.label,
            data: item.value,
            borderColor: item.color,
            borderWidth: 2,
            tension: 0.4,
            fill: false,
          }))}
          yLabel="Probability"
          isLoading={isLoading || isFetching}
          showYGrid={false}
          showDots={false}
          fillArea
          fillGradient
        />
      </VStack>
    </VStack>
  );
};

export default AssetFailureProbabilityTrend;
