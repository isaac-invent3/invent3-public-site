import { Divider, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryCardStats from './SummaryCardStats';
import AssetCountList from './AssetCountList';
import PieChartStats from './PieChartStats';
import {
  useGetCumulativeAssetStatusCountByCountryIdQuery,
  useGetCumulativeAssetStatusCountByStateIdQuery,
} from '~/lib/redux/services/asset/stats.services';
import { MapAssetData } from '~/lib/interfaces/general.interfaces';

interface StatsProps {
  isLoading: boolean;
  data: Record<string, { name: string; count: number; id: number }>;
  type: 'state' | 'lga';
  selectedState: MapAssetData | null;
}
const Stats = (props: StatsProps) => {
  const { isLoading, data, type, selectedState } = props;
  const { data: countryStats, isLoading: isLoadingCountryStats } =
    useGetCumulativeAssetStatusCountByCountryIdQuery(1);
  const { data: stateStats, isLoading: isLoadingStateStats } =
    useGetCumulativeAssetStatusCountByStateIdQuery(selectedState?.id, {
      skip: !selectedState?.id,
    });

  return (
    <VStack
      width="full"
      divider={<Divider borderColor="#BBBBBB" />}
      spacing="16px"
    >
      <SummaryCardStats
        isLoading={isLoading || isLoadingCountryStats || isLoadingStateStats}
        data={selectedState?.id ? stateStats?.data : countryStats?.data}
      />
      <AssetCountList isLoading={isLoading} data={data} type={type} />
      <PieChartStats
        isLoading={isLoading || isLoadingCountryStats || isLoadingStateStats}
        data={selectedState?.id ? stateStats?.data : countryStats?.data}
      />
    </VStack>
  );
};

export default Stats;
