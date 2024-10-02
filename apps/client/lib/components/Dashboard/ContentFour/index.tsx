import { Flex } from '@chakra-ui/react';
import React from 'react';
import RecentAsset from './RecentAsset';
import CTA from './CTA';

const ContentFour = () => {
  return (
    <Flex width="full" gap="16px">
      <Flex width="71%">
        <RecentAsset />
      </Flex>
      <Flex width="29%">
        <CTA />
      </Flex>
    </Flex>
  );
};

export default ContentFour;
