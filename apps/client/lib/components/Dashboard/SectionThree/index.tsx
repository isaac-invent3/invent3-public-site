import { Flex } from '@chakra-ui/react';

import AssetsInRegion from './AssetsInRegion';
import UpcomingMaintenance from './UpcomingMaintenance';

const SectionThree = () => {
  return (
    <Flex width="full" gap="16px">
      <Flex width="48%">
        <AssetsInRegion />
      </Flex>
      <Flex width="52%">
        <UpcomingMaintenance />
      </Flex>
    </Flex>
  );
};

export default SectionThree;
