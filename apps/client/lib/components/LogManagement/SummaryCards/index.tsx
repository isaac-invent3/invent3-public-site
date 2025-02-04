import { SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';
import {
  MaintenanceIcon,
  TaskIcon,
  TicketIcon,
} from '../../CustomIcons/Dashboard';

const SummaryCards = () => {
  return (
    <SimpleGrid width="full" gap="16px" columns={4}>
      <SummaryCardWrapper
        title="Open Ticket"
        icon={TicketIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Text size="xl" fontWeight={800} color="primary.500">
          9000
        </Text>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Open Ticket"
        icon={TicketIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Text size="xl" fontWeight={800} color="red.500">
          900
        </Text>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Open Ticket"
        icon={MaintenanceIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Text size="xl" fontWeight={800} color="primary.500">
          20
        </Text>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Open Ticket"
        icon={TaskIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Text size="xl" fontWeight={800} color="primary.500">
          460
        </Text>
      </SummaryCardWrapper>
    </SimpleGrid>
  );
};

export default SummaryCards;
