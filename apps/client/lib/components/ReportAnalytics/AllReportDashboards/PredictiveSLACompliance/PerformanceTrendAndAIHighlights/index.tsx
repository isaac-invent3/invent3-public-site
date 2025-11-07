import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';

import AIComplianceInsight from './AIComplianceInsight';
import PerformanceTrends from './PerformanceTrend';

const PerformanceTrendAndAIHighlights = () => {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(3, 1fr)' }}
      gap="14px"
    >
      <GridItem colSpan={{ base: 3, xl: 2 }} height="full">
        <SimpleGrid height="full">
          <PerformanceTrends />
        </SimpleGrid>
      </GridItem>
      <GridItem colSpan={{ base: 3, xl: 1 }} width="full">
        <SimpleGrid height="full">
          <AIComplianceInsight />
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default PerformanceTrendAndAIHighlights;
