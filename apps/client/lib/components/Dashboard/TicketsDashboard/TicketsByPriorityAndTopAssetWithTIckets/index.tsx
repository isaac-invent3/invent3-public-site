import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TicketsByPriority from './TicketsByPriority';
import AssetFacilitiesWithMostTickets from './AssetFacilitiesWithMostTickets';

const TicketsByPriorityAndTopAssetWithTIckets = () => {
  return (
    <SimpleGrid width="full" spacing="14px" columns={{ base: 1, lg: 2 }}>
      <TicketsByPriority />
      <AssetFacilitiesWithMostTickets />
    </SimpleGrid>
  );
};

export default TicketsByPriorityAndTopAssetWithTIckets;
