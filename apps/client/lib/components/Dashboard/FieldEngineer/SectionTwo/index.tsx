import { Flex, Stack } from '@chakra-ui/react';
import UpcomingMaintenance from '../../Common/UpcomingMaintenance';
import AssignedTickets from './AssignedTicket';

const SectionTwo = () => {
  return (
    <Stack
      width="full"
      minH="354px"
      spacing="16px"
      flexDir={{ base: 'column', lg: 'row' }}
    >
      <Flex
        width={{ base: 'full', lg: '42%' }}
        height="full"
        flexDir={{ base: 'column', lg: 'row' }}
      >
        <AssignedTickets />
      </Flex>
      <Flex
        width={{ base: 'full', lg: '58%' }}
        height="full"
        flexDir={{ base: 'column', lg: 'row' }}
      >
        <UpcomingMaintenance />
      </Flex>
    </Stack>
  );
};

export default SectionTwo;
