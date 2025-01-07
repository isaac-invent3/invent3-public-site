import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';

import AssetSelect from '~/lib/components/Common/AssetSelect';
import { FormSectionInfo } from '@repo/ui/components';

const ParentAsset = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <FormSectionInfo
          title="Parent Asset"
          info="Select the Parent Asset if there is any"
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
