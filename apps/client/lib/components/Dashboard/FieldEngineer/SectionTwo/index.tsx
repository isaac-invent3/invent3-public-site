import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import UpcomingMaintenance from '../../Common/UpcomingMaintenance';
import AssignedTickets from './AssignedTicket';

const SectionTwo = () => {
  return (
    <HStack width="full" minH="354px" spacing="16px">
      <Flex width="42%" height="full">
        <AssignedTickets />
      </Flex>
      <Flex width="58%" height="full">
        <UpcomingMaintenance />
      </Flex>
    </HStack>
  );
};

export default SectionTwo;
