import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import AssetDistribution from './AssetDistribution';
import RecentAsset from '../../OperationManager/SectionFour/RecentAsset';

const SectionThree = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" width="full" gap="16px" minH="345px">
      <GridItem colSpan={2}>
        <RecentAsset />
      </GridItem>
      <GridItem colSpan={1}>
        <AssetDistribution />
      </GridItem>
    </Grid>
  );
};

export default SectionThree;
