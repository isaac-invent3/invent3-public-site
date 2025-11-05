import { Grid, GridItem, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TicketClosedGraph from './TicketClosedGraph';
import TicketCreationSource from './TicketCreationSource';
import TicketStatus from './TicketStatus';

const TicketClosedSourceStatusGraph = () => {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
      gap="14px"
    >
      <GridItem colSpan={1}>
        <TicketClosedGraph />
      </GridItem>
      <GridItem colSpan={2}>
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
