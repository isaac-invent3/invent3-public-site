import { Grid, GridItem } from '@chakra-ui/react';
import { FormInputWrapper } from '@repo/ui/components';

import AssetSelect from '~/lib/components/Common/SelectComponents/AssetSelect';

const ParentAsset = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="118px"
      customSpacing="104px"
      description="Select the Parent Asset if there is any"
      title="Parent Asset"
      isRequired
      direction={{ base: 'column', md: 'row' }}
    >
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap="11px"
        width="full"
      >
        <GridItem colSpan={{ base: 1, md: 2, lg: 2 }}>
          <AssetSelect selectName="parentId" selectTitle="Parent Asset" />
        </GridItem>
      </Grid>
    </FormInputWrapper>
  );
};

export default ParentAsset;
