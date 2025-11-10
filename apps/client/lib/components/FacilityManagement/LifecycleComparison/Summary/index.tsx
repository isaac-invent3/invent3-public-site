import { SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { AssetBoxIcon } from '~/lib/components/CustomIcons';
import SummaryCard from '~/lib/components/Dashboard/Common/Summaries/SummaryCardWithPercentChange';
import { LifeCycleSummary } from '~/lib/interfaces/location/lifecycle.interfaces';

const Summary = ({
  data,
  isLoading,
}: {
  data: LifeCycleSummary | undefined;
  isLoading: boolean;
}) => {
  return (
    <SimpleGrid columns={{ base: 2, lg: 4 }} spacing="16px">
      <SummaryCard
        title="Total Facilities Compared"
        icon={AssetBoxIcon}
        value={data?.totalFacilitiesCompared ?? 0}
        isLoading={isLoading}
        rangeText="facilities"
      />
      <SummaryCard
        title="Best Performing Facility"
        icon={AssetBoxIcon}
        value={data?.bestPerformingFacilityName ?? 'N/A'}
        isLoading={isLoading}
        showRange={false}
      />
      <SummaryCard
        title="Worst Performing Facility"
        icon={AssetBoxIcon}
        value={data?.worstPerformingFacilityName ?? 'N/A'}
        isLoading={isLoading}
        showRange={false}
      />
      <SummaryCard
        title="Avg Remaining Useful Life (RUL)"
        icon={AssetBoxIcon}
        value={data?.meanRul ? `${data?.meanRul?.toFixed(2)} Years` : 'N/A'}
        isLoading={isLoading}
        showRange={false}
        containerStyle={{ justifyContent: 'flex-start' }}
        subContainerStyle={{ height: 'min-content' }}
      >
        <Text mt="8px" color="neutral.600" fontWeight={700}>
          Across all assets compared
        </Text>
      </SummaryCard>
    </SimpleGrid>
  );
};

export default Summary;
