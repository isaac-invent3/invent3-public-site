import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import UpcomingMaintenance from '../../Common/UpcomingMaintenance';
import Tasks from './Tasks';

const SectionFour = () => {
  return (
    <HStack width="full" minH="354px" flexDir={{ base: 'column', md: 'row' }}>
      <Flex
        width={{ base: 'full', md: '58%' }}
        height="full"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <UpcomingMaintenance />
      </Flex>
      <Flex
        width={{ base: 'full', md: '42%' }}
        height="full"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Tasks />
      </Flex>
    </HStack>
  );
};

export default SectionFour;
