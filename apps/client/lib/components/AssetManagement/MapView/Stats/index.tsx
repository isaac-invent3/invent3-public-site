import { Divider, VStack } from '@chakra-ui/react';
import React from 'react';
import AssetCountList from './AssetCountList';
import PieChartStats from './PieChartStats';
import {
  useGetCumulativeAssetStatusCountByCountryIdQuery,
  useGetCumulativeAssetStatusCountByStateIdQuery,
} from '~/lib/redux/services/asset/stats.services';
import { SingleMapAssetData } from '~/lib/interfaces/asset.interfaces';
import SummaryCardStats from './SummardCardStats';

interface StatsProps {
  isLoading: boolean;
  data: Record<string, SingleMapAssetData>;
  type: 'state' | 'lga';
  selectedState: SingleMapAssetData | null;
  currentAssetStatus: string;
  setCurrentAssetStatus: React.Dispatch<React.SetStateAction<string>>;
}
const Stats = (props: StatsProps) => {
  const {
    isLoading,
    data,
    type,
    selectedState,
    currentAssetStatus,
    setCurrentAssetStatus,
  } = props;
  const { data: countryStats, isLoading: isLoadingCountryStats } =
    useGetCumulativeAssetStatusCountByCountryIdQuery(1);
  const { data: stateStats, isLoading: isLoadingStateStats } =
    useGetCumulativeAssetStatusCountByStateIdQuery(selectedState?.id, {
      skip: !selectedState?.id,
    });

  const finalData = selectedState?.id ? stateStats?.data : countryStats?.data;

  return (
    <VStack
      width="full"
      divider={<Divider borderColor="#BBBBBB" />}
      spacing="16px"
    >
      <VStack width="full" spacing="8px">
        <SummaryCardStats
          isLoading={isLoading || isLoadingCountryStats || isLoadingStateStats}
          infoOneSwitchText="Total Value"
          infoTwoSwitchText="Total Count"
          info={{
            infoOne: {
              iconColor: '#07CC3B',
              bgColor: '#FFFFFF0D',
              textColor: '#838383',
              label: 'Total Assets Value',
              value: 2100000000,
              shorten: true,
              suffix: '₦',
            },
            infoTwo: {
              iconColor: '#00380F',
              bgColor: '#BBBBBB',
              textColor: '#0E2642',
              label: 'Total Assets Count',
              value: 109000,
              shorten: true,
            },
          }}
        />

        <SummaryCardStats
          isLoading={isLoading || isLoadingCountryStats || isLoadingStateStats}
          infoOneSwitchText="In Use"
          infoTwoSwitchText="Not in Use"
          setCurrentInfo={setCurrentAssetStatus}
          info={{
            infoOne: {
              iconColor: '#07CC3B',
              bgColor: '#07CC3B0D',
              textColor: '#838383',
              label: 'Assets in Use',
              value: finalData?.activeAssets,
              shorten: false,
            },
            infoTwo: {
              iconColor: '#EABC30',
              bgColor: '#EABC300D',
              textColor: '#838383',
              value: finalData?.assetsNotInUse,
              label: 'Assets not in Use',
              shorten: false,
            },
          }}
        />
      </VStack>
      <AssetCountList
        isLoading={isLoading}
        data={data}
        type={type}
        currentAssetStatus={currentAssetStatus}
      />
      <PieChartStats
        isLoading={isLoading || isLoadingCountryStats || isLoadingStateStats}
        data={selectedState?.id ? stateStats?.data : countryStats?.data}
      />
    </VStack>
  );
};

export default Stats;
