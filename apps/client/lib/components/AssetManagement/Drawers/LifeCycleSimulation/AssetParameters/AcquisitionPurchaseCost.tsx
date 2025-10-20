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
          description="Acquisition Date"
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
          description="Enter the initial cost of the asset."
          title="Purchase Price"
          isRequired
        >
          <Field
            as={FormTextInput}
            name="purchasePrice"
            type="number"
            label="Purchase Price"
          />
        </FormInputWrapper>
      </GridItem>
    </Grid>
  );
};

export default AcquisitionPurchaseCost;
