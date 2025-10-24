import { Grid, GridItem } from '@chakra-ui/react';
import {
  FormDatePicker,
  FormInputWrapper,
  FormTextInput,
} from '@repo/ui/components';
import { Field } from 'formik';
import React from 'react';
import CategorySelect from '../../../AssetForm/GeneralStep/AssetCategory/CategorySelect';

const AcquisitionPurchaseCost = () => {
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
          description="Choose the date the asset was acquired."
          title="Acquisition Date"
          isRequired
        >
          <FormDatePicker
            name="acquisitionDate"
            label="Select Date"
            maxDate={new Date()}
          />
        </FormInputWrapper>
      </GridItem>
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="141px"
          customSpacing="16px"
          description="Enter the asset’s purchase cost."
          title="Purchase Price"
          isRequired
        >
          <Field
            as={FormTextInput}
            name="purchaseCost"
            type="number"
            label="Purchase Price"
          />
        </FormInputWrapper>
      </GridItem>
    </Grid>
  );
};

export default AcquisitionPurchaseCost;
