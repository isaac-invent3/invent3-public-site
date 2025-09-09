import { Divider, VStack } from '@chakra-ui/react';

import FacilityCountList from './FacilityCountList';
import {
  useGetCumulativeAssetStatusCountByCountryIdQuery,
  useGetCumulativeAssetStatusCountByStateIdQuery,
} from '~/lib/redux/services/asset/stats.services';
import SummaryCardStats from './SummardCard';
import { SingleMapFacilityData } from '~/lib/interfaces/location.interfaces';

interface StatsProps {
  isLoading: boolean;
  data: Record<string, SingleMapFacilityData>;
  type: 'state' | 'lga';
  selectedState: SingleMapFacilityData | null;
}
const Stats = (props: StatsProps) => {
  const { isLoading, data, type, selectedState } = props;

  // total count
  const totalCount = Object.values(data).reduce(
    (sum, facility) => sum + facility.count,
    0
  );

  return (
    <VStack
      width="full"
      divider={<Divider borderColor="#BBBBBB" />}
      spacing="16px"
    >
      <SummaryCardStats
        isLoading={isLoading}
        count={totalCount}
        stateName={type === 'lga' ? selectedState?.name : undefined}
      />
      <FacilityCountList isLoading={isLoading} data={data} type={type} />
    </VStack>
  );
};

export default Stats;
