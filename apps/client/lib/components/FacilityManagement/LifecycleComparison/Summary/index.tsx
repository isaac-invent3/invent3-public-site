import { SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { AssetBoxIcon } from '~/lib/components/CustomIcons';
import SummaryCard from '~/lib/components/Dashboard/Common/Summaries/SummaryCardWithPercentChange';

const Summary = () => {
  return (
    <SimpleGrid columns={{ base: 2, lg: 4 }} spacing="16px">
      <SummaryCard
        title="Total Facilities Compared"
        icon={AssetBoxIcon}
        value={5}
        isLoading={false}
        rangeText="User selected 5 facilities"
      />
      <SummaryCard
        title="Best Performing Facility"
        icon={AssetBoxIcon}
        value={'Lagos HQ'}
        isLoading={false}
        showRange={false}
      />
      <SummaryCard
        title="Worst Performing Facility"
        icon={AssetBoxIcon}
        value={'Abuja Branch'}
        isLoading={false}
        showRange={false}
      />
      <SummaryCard
        title="Avg Remaining Useful Life (RUL)"
        icon={AssetBoxIcon}
        value={'7.8 Years'}
        isLoading={false}
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
