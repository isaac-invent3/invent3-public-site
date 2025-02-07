import { Flex } from '@chakra-ui/react';

import AssetSummary from './AssetSummary';
import MaintenanceCostGraph from './MaintenanceCostGraph';
import MeanTime from './MeanTime';

const SectionTwo = () => {
  return (
    <Flex width="full" gap="16px" flexDir={{ base: 'column', md: 'row' }}>
      <Flex
        width={{ base: 'full', md: '24%' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <AssetSummary />
      </Flex>
      <Flex
        width={{ base: 'full', md: '46%' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <MaintenanceCostGraph />
      </Flex>
      <Flex
        width={{ base: 'full', md: '30%' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <MeanTime />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
