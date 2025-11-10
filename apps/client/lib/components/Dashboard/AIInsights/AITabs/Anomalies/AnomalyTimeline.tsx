import { VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { useGetRecentMLAnomalyTimelineQuery } from '~/lib/redux/services/dashboard/ai';

const AnomalyTimeline = () => {
  const { data, isLoading, isFetching } = useGetRecentMLAnomalyTimelineQuery();

  // ✅ Transform API response into chart-friendly format
  const dataItems = useMemo(() => {
    if (!data?.data) return [];

    return [
      {
        label: 'Count',
        value: data?.data?.map((item) => item.count) || [],
        color: '#F50000',
      },
    ];
  }, [data]);

  const labels = data?.data?.map((item) => item.hour) || [];

  return (
    <VStack width="full" height="full" alignItems="flex-start" spacing="66px">
      <CardHeader>Recent Anomaly Timeline</CardHeader>
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
          yLabel="Count"
          isLoading={isLoading || isFetching}
          showYGrid={false}
          showDots={false}
        />
      </VStack>
    </VStack>
  );
};

export default AnomalyTimeline;
