import { Flex } from '@chakra-ui/react';

import UpcomingMaintenance from '../../Common/UpcomingMaintenance';
import AssetsInRegion from './AssetsInRegion';

const SectionThree = () => {
  return (
    <Flex width="full" gap="16px" flexDir={{ base: 'column', md: 'row' }}>
      <Flex
        width={{ base: 'full', md: '48%' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <AssetsInRegion />
      </Flex>
      <Flex
        width={{ base: 'full', md: '52%' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <UpcomingMaintenance />
      </Flex>
    </Flex>
  );
};

export default SectionThree;
