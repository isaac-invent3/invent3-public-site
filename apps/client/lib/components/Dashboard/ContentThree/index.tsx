import { Flex } from '@chakra-ui/react';
import React from 'react';
import AssetsInRegion from './AssetsInRegion';
import UpcomingMaintenance from './UpcomingMaintenance';

const ContentThree = () => {
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

export default ContentThree;
