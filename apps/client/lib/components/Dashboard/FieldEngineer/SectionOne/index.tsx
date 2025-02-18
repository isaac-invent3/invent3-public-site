import { Grid, GridItem } from '@chakra-ui/react';
import LeftSide from './LeftSide';
import UsersSchedule from './UserSchedule';

const SectionOne = () => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap="16px"
      display={{ base: 'flex', lg: 'grid' }}
      flexDir={{ base: 'column', lg: 'row' }}
      width="full"
    >
      <GridItem colSpan={2} width="full">
        <LeftSide />
      </GridItem>
      <GridItem colSpan={1} width="full">
        <UsersSchedule />
      </GridItem>
    </Grid>
  );
};

export default SectionOne;
