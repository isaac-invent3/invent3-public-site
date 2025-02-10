import { Grid, GridItem } from '@chakra-ui/react';
import RecentAsset from '../../OperationManager/SectionFour/RecentAsset';
import AssetDistribution from './AssetDistribution';

const SectionThree = () => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      width="full"
      gap="16px"
      minH={{ md: '345px' }}
      display={{ base: 'flex', lg: 'grid' }}
      flexDir={{ base: 'column', lg: 'row' }}
    >
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
