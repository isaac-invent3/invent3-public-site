import { Flex, Grid, GridItem, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TicketClosedGraph from './TicketClosedGraph';
import TicketCreationSource from './TicketCreationSource';
import TicketStatus from './TicketStatus';

const TicketClosedSourceStatusGraph = () => {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(3, 1fr)' }}
      gap="14px"
    >
      <GridItem colSpan={{ base: 3, xl: 1 }} height="full">
        <SimpleGrid height="full">
          <TicketClosedGraph />
        </SimpleGrid>
      </GridItem>
      <GridItem colSpan={{ base: 3, xl: 2 }} width="full">
        <SimpleGrid
          width="full"
          spacing="14px"
          columns={{ base: 1, lg: 2 }}
          height="full"
        >
          <TicketCreationSource />
          <TicketStatus />
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default TicketClosedSourceStatusGraph;
