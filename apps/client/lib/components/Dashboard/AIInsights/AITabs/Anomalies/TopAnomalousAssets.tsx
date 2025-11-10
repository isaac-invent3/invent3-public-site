import { VStack } from '@chakra-ui/react';
import React from 'react';
import { useGetTopMLAnomalousAssetsQuery } from '~/lib/redux/services/dashboard/ai';
import CardHeader from '../../../Common/CardHeader';
import BarChart from '../../../Common/Charts/BarChart';

const TopAnomalousAssets = () => {
  const { data, isLoading } = useGetTopMLAnomalousAssetsQuery();

  const dataItems = [
    {
      label: 'Cost',
      values: data?.data?.map((item) => item.score) ?? [],
      color: '#FF383C',
    },
  ];

  return (
    <VStack
      height="full"
      width="full"
      alignItems="flex-start"
      spacing="43px"
      bgColor="white"
    >
      <CardHeader>Top 5 Anomalous Assets</CardHeader>
      <BarChart
        labels={data?.data ? data?.data.map((item) => item.name) : []}
        chartData={dataItems}
        isLoading={isLoading}
        isStacked={false}
        barRadius={16}
        horizontal
        showGridX
        showGridY={false}
      />
    </VStack>
  );
};

export default TopAnomalousAssets;
