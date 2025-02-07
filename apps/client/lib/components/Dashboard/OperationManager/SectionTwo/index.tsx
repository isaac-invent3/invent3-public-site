import { Flex } from '@chakra-ui/react';

import MeanTime from './MeanTime';
import MaintenanceCostGraph from './MaintenanceCostGraph';
import AssetSummary from './AssetSummary';

const SectionTwo = () => {
  return (
    <Flex
      width="full"
      gap="16px"
      direction={{ base: 'column', lg: 'row' }}
      px={{ base: '16px', md: 0 }}
    >
      <Flex width={{ base: '100%', lg: '24%' }}>
        <AssetSummary />
      </Flex>
      <Flex
        width={{ base: '100%', lg: '76%' }}
        direction={{ base: 'column', md: 'row' }}
        gap="16px"
      >
        <Flex width={{ base: 'full', md: '50%', lg: '60.5%' }}>
          <MaintenanceCostGraph />
        </Flex>
        <Flex width={{ base: 'full', md: '50%', lg: '39.5%' }}>
          <MeanTime />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
