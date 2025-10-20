import { Grid, GridItem, VStack } from '@chakra-ui/react';
import {
  ErrorMessage,
  FormInputWrapper,
  FormTextInput,
} from '@repo/ui/components';
import { Field, useField } from 'formik';
import React from 'react';
import CategorySelect from '../../../AssetForm/GeneralStep/AssetCategory/CategorySelect';

const AssetNameCategory = () => {
  const [field, meta, helpers] = useField('categoryName');
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={{ base: '24px' }}
      width="full"
    >
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="141px"
          customSpacing="16px"
          title="Asset Name"
          isRequired
          description="Input the asset name"
        >
          <Field
            as={FormTextInput}
            name="assetName"
            type="text"
            label="Asset Name"
          />
        </FormInputWrapper>
      </GridItem>
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="141px"
          customSpacing="16px"
          title="Category"
          isRequired
          description="Category Name"
        >
          <VStack width="full" alignItems="flex-start">
            <CategorySelect handleSelect={(option) => {}} />
            {meta.touched && meta.error !== undefined && (
              <ErrorMessage>{meta.error}</ErrorMessage>
            )}
          </VStack>
        </FormInputWrapper>
      </GridItem>
    </Grid>
  );
};

export default AssetNameCategory;
