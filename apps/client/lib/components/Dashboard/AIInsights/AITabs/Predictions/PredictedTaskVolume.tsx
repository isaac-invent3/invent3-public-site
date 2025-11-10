import { VStack } from '@chakra-ui/react';
import React from 'react';
import BarChart from '../../../Common/Charts/BarChart';
import { useGetMLInsightTaskVolumeQuery } from '~/lib/redux/services/dashboard/ai';
import CardHeader from '../../../Common/CardHeader';

const PredictedTaskVolume = () => {
  const { data, isLoading } = useGetMLInsightTaskVolumeQuery();
  const dataItems = [
    {
      label: 'Task',
      values: data?.data?.map((item) => item.tasks) ?? [],
      color: '#0E2642',
    },
  ];

  return (
    <VStack height="full" width="full" alignItems="flex-start" spacing="36px">
      <CardHeader>Predicted Task Volume (Next 7 Days)</CardHeader>
      <BarChart
        labels={data?.data ? data?.data.map((item) => item.day) : []}
        chartData={dataItems}
        isLoading={isLoading}
        isStacked={false}
      />
    </VStack>
  );
};

export default PredictedTaskVolume;
