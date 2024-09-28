import { Divider, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryCardStats from './SummaryCardStats';
import AssetCountList from './AssetCountList';
import PieChartStats from './PieChartStats';

interface StatsProps {
  isLoading: boolean;
  data: Record<string, { name: string; count: number; id: number }>;
  type: 'state' | 'lga';
}
const Stats = (props: StatsProps) => {
  const { isLoading, data, type } = props;
  return (
    <VStack
      width="full"
      divider={<Divider borderColor="#BBBBBB" />}
      spacing="16px"
    >
      <SummaryCardStats isLoading={isLoading} />
      <AssetCountList isLoading={isLoading} data={data} type={type} />
      <PieChartStats isLoading={isLoading} />
    </VStack>
  );
};

export default Stats;
