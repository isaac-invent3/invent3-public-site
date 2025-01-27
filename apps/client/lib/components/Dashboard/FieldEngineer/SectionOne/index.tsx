import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import LeftSide from './LeftSide';
import UsersSchedule from './UserSchedule';

const SectionOne = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="16px" width="full">
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
