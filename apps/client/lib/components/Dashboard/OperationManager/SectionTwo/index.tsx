import { Flex } from '@chakra-ui/react';

import MaintenanceCostGraph from './MaintenanceCostGraph';
import MeanTime from './MeanTime';

const SectionTwo = () => {
  return (
    <Flex
      width="full"
      gap="16px"
      direction={{ base: 'column', lg: 'row' }}
      px={{ base: '16px', md: 0 }}
    >
      <Flex
        width={{ base: '100%' }}
        direction={{ base: 'column', md: 'row' }}
        gap="16px"
      >
        <Flex width={{ base: 'full', md: '50%', lg: '70%' }}>
          <MaintenanceCostGraph />
        </Flex>
        <Flex width={{ base: 'full', md: '50%', lg: '30%' }}>
          <MeanTime />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
