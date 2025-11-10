import { VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { useGetAiLearningCurveQuery } from '~/lib/redux/services/dashboard/ai';

const AILearningCurve = () => {
  const { data, isLoading, isFetching } = useGetAiLearningCurveQuery();

  // ✅ Transform API response into chart-friendly format
  const dataItems = useMemo(() => {
    if (!data?.data) return [];

    return [
      {
        label: 'Accuracy',
        value: data?.data?.map((item) => item.accuracy) || [],
        color: '#00A129',
      },
    ];
  }, [data]);

  const labels = data?.data?.map((item) => `Week ${item.week}`) || [];

  return (
    <VStack width="full" height="full" alignItems="flex-start" spacing="66px">
      <CardHeader>AI Learning Curve</CardHeader>
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
          yLabel="Accuracy (%)"
          isLoading={isLoading || isFetching}
          showYGrid={false}
          showDots={false}
        />
      </VStack>
    </VStack>
  );
};

export default AILearningCurve;
