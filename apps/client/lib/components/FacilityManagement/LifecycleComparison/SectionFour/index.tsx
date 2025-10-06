import { Flex } from '@chakra-ui/react';
import React from 'react';
import RUL from './RUL';
import InsightsPanel from './InsightsPanel';

const SectionFour = () => {
  return (
    <Flex width="full" gap="16px" direction={{ base: 'column', lg: 'row' }}>
      <Flex width={{ base: 'full', lg: '501px' }}>
        <RUL />
      </Flex>
      <Flex width="full" maxW={{ lg: 'calc(100% - 501px)' }}>
        <InsightsPanel />
      </Flex>
    </Flex>
  );
};

export default SectionFour;
