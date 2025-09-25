import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import TicketTrend from './TicketTrend';
import StageDistribution from './StageDistribution';

const SectionTwo = () => {
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      width="full"
      gap={{ md: '16px' }}
    >
      <GridItem colSpan={2}>
        <SimpleGrid
          columns={{ base: 1 }}
          width="full"
          bgColor="white"
          rounded="8px"
        >
          <TicketTrend />
        </SimpleGrid>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2, lg: 1 }} mt={{ base: '1em', md: 0 }}>
        <StageDistribution />
      </GridItem>
    </Grid>
  );
};

export default SectionTwo;
