import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import SectionInfo from '../../SectionInfo';
import AssetTypeSelect from './AssetType';
import AssetStatusSelect from './AssetStatus';

const AssetTypeStatus = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Asset Info"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="11px" width="full">
        <GridItem colSpan={3}>
          <HStack spacing="11px" alignItems="flex-start">
            <AssetTypeSelect />
            <AssetStatusSelect />
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default AssetTypeStatus;
