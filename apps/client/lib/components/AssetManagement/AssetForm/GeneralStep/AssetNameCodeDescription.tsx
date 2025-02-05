import { Flex, Grid, GridItem, Stack, VStack } from '@chakra-ui/react';
import { Field } from 'formik';

import AssetCategory from './AssetCategory';
import {
  FormSectionInfo,
  FormTextAreaInput,
  FormTextInput,
} from '@repo/ui/components';

const AssetNameCodeDescription = () => {
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      width="full"
      alignItems="flex-start"
      spacing={{ base: '16px', lg: '104px' }}
    >
      <Flex
        width="full"
        maxW="118px"
        direction="column"
        gap="14px"
        display={{ base: 'none', md: 'flex' }}
      >
        <FormSectionInfo
          title="Asset Name"
          info="Find and select the asset you require"
          isRequired
        />
        <FormSectionInfo
          title="Category"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={{ base: '16px', md: '11px' }}
        width="full"
      >
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <VStack
            width="full"
            spacing="32px"
            alignItems="flex-start"
            height="full"
          >
            <VStack spacing="16px" width="full">
              <FormSectionInfo
                title="Asset Name"
                info="Find and select the asset you require"
                isRequired
                display={{ md: 'none' }}
              />
              <Field
                as={FormTextInput}
                name="assetName"
                type="text"
                label="Name"
                placeholder="Name"
              />
            </VStack>
            <VStack spacing="16px" width="full">
              <FormSectionInfo
                title="Category"
                info="Choose the category and the sub-category"
                isRequired
                display={{ md: 'none' }}
              />
              <AssetCategory />
            </VStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <Field
            as={FormTextAreaInput}
            name="description"
            type="text"
            label="Description"
            placeholder="Description"
            customStyle={{ height: '133px' }}
          />
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default AssetNameCodeDescription;
