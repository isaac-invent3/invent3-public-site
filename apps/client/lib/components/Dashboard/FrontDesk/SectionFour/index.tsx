import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import UpcomingMaintenance from '../../Common/UpcomingMaintenance';
import Tasks from './Tasks';

const SectionFour = () => {
  return (
    <HStack width="full" minH="354px">
      <Flex width="58%" height="full">
        <UpcomingMaintenance />
      </Flex>
      <Flex width="42%" height="full">
        <Tasks />
      </Flex>
    </HStack>
  );
};

export default SectionFour;
