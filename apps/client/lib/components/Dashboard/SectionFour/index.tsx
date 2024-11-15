import { Flex } from '@chakra-ui/react';
import React from 'react';
import RecentAsset from './RecentAsset';
import CTA from './CTA';

const SectionFour = () => {
  return (
    <Flex width="full" gap="16px">
      <Flex width="full" maxW="calc(100% - 358px)">
        <RecentAsset />
      </Flex>
      <Flex width="29%">
        <CTA />
      </Flex>
    </Flex>
  );
};

export default SectionFour;
