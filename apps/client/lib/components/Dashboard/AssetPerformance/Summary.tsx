import { Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../Common/Summaries/SummaryCardWithPercentChange';
import { AssetBoxIcon } from '../../CustomIcons';
import ProgressIndicator from '../Common/ProgressIndicator';

const Summary = () => {
  return (
    <SimpleGrid width="full" gap="14px" columns={{ base: 1, sm: 2, md: 4 }}>
      <SummaryCard
        title="Total Asset"
        icon={AssetBoxIcon}
        value={1298}
        isLoading={false}
        showRange={false}
        containerStyle={{ minH: '155px' }}
      />
      <SummaryCard
        title="Average Uptime (%)"
        icon={AssetBoxIcon}
        value={'97.3%'}
        isLoading={false}
        showRange={false}
        containerStyle={{ minH: '155px', position: 'relative' }}
        additionalContent={
          <ProgressIndicator
            valueChange={2.1}
            customStyles={{ bgColor: '#6E7D8E33' }}
          />
        }
        customCountStyle={{ color: '#009F2A' }}
      >
        <Flex
          width="full"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgColor="#009F2A0F"
        />
      </SummaryCard>
      <SummaryCard
        title="Assets in Downtime"
        icon={AssetBoxIcon}
        value={18}
        isLoading={false}
        showRange={true}
        containerStyle={{ minH: '155px', position: 'relative' }}
        rangeText="3 from yesterday"
        customCountStyle={{ color: '#F50000' }}
      >
        <Flex
          width="full"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgColor="#F500000F"
        />
      </SummaryCard>
      <SummaryCard
        title="Average Health Score"
        icon={AssetBoxIcon}
        value={'86%'}
        isLoading={false}
        showRange={false}
        containerStyle={{ minH: '155px', position: 'relative' }}
        customCountStyle={{ color: '#D67D00' }}
      >
        <Flex
          width="full"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgColor="#D67D000F"
        />
      </SummaryCard>
    </SimpleGrid>
  );
};

export default Summary;
