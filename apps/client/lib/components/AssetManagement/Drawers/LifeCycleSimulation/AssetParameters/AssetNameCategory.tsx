import { Grid, GridItem } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';
import React from 'react';
import CategorySelect from '../../../AssetForm/GeneralStep/AssetCategory/CategorySelect';

const AssetNameCategory = () => {
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
          description="Enter the name of the asset."
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
          description="Select the asset’s category."
        >
          <CategorySelect name="categoryName" handleSelect={(option) => {}} />
        </FormInputWrapper>
      </GridItem>
    </Grid>
  );
};

export default AssetNameCategory;
