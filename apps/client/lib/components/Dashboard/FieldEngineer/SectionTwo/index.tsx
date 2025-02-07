import { Flex, Stack } from '@chakra-ui/react';
import UpcomingMaintenance from '../../Common/UpcomingMaintenance';
import AssignedTickets from './AssignedTicket';

const SectionTwo = () => {
  return (
    <Stack
      width="full"
      minH="354px"
      spacing="16px"
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Flex
        width={{ base: 'full', md: '42%' }}
        height="full"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <AssignedTickets />
      </Flex>
      <Flex
        width={{ base: 'full', md: '58%' }}
        height="full"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <UpcomingMaintenance />
      </Flex>
    </Stack>
  );
};

export default SectionTwo;
