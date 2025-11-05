import { Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../Common/Summaries/SummaryCardWithPercentChange';
import { AssetBoxIcon } from '../../CustomIcons';
import ProgressIndicator from '../Common/ProgressIndicator';

const Summary = () => {
  return (
    <SimpleGrid width="full" gap="14px" columns={{ base: 1, sm: 2, md: 4 }}>
      <SummaryCard
        title="Total Tickets"
        icon={AssetBoxIcon}
        value={1205}
        isLoading={false}
        showRange={false}
        containerStyle={{ minH: '155px' }}
        additionalContent={
          <HStack spacing={2}>
            <ProgressIndicator valueChange={2} />
            <Text color="neutral.600" fontWeight={700}>
              from last week
            </Text>
          </HStack>
        }
      />
      <SummaryCard
        title="Open Tickets"
        icon={AssetBoxIcon}
        value={320}
        isLoading={false}
        showRange={false}
        containerStyle={{ minH: '155px', position: 'relative' }}
        additionalContent={
          <HStack spacing={2}>
            <ProgressIndicator
              valueChange={2.1}
              iconStyles={{ color: '#D67D00' }}
              textStyles={{ color: '#D67D00' }}
              customStyles={{ bgColor: '#6E7D8E33', color: '#D67D00' }}
            />
            <Text color="neutral.600" fontWeight={700}>
              vs last week
            </Text>
          </HStack>
        }
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
      <SummaryCard
        title="Overdue Tickets"
        icon={AssetBoxIcon}
        value={18}
        isLoading={false}
        showRange={true}
        containerStyle={{ minH: '155px', position: 'relative' }}
        customCountStyle={{ color: '#F50000' }}
        additionalContent={
          <HStack spacing={2}>
            <ProgressIndicator
              valueChange={2.1}
              iconStyles={{ color: '#F50000' }}
              textStyles={{ color: '#F50000' }}
              customStyles={{ bgColor: '#6E7D8E33', color: '#F50000' }}
            />
            <Text color="neutral.600" fontWeight={700}>
              Overdue
            </Text>
          </HStack>
        }
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
        title="SLA Compliance Rate"
        icon={AssetBoxIcon}
        value={'91.2%'}
        isLoading={false}
        showRange={false}
        containerStyle={{ minH: '155px', position: 'relative' }}
      />
    </SimpleGrid>
  );
};

export default Summary;
