import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';

import SectionInfo from '../../../UI/Form/FormSectionInfo';
import AssetSelect from '~/lib/components/Common/AssetSelect';

const ParentAsset = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Parent Asset"
          info="Select a Parent you choose to link to"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap="11px" width="full">
        <GridItem colSpan={2}>
          <AssetSelect selectName="parentId" selectTitle="Parent Asset" />
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default ParentAsset;
