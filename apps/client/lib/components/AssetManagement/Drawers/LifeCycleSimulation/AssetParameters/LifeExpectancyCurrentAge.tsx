import { Grid, GridItem } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';
import React from 'react';
import CategorySelect from '../../../AssetForm/GeneralStep/AssetCategory/CategorySelect';

const LifeExpectancyCurrentAge = () => {
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
          title="Expected Useful Life"
          isRequired
          description="Input Expected Useful Life"
        >
          <Field
            as={FormTextInput}
            name="expectedUsefulLife"
            type="text"
            label="Asset Name"
          />
        </FormInputWrapper>
      </GridItem>
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="141px"
          customSpacing="16px"
          title="Current Age"
          isRequired
          description="Current age of Asset"
        >
          <Field
            as={FormTextInput}
            name="currentAge"
            type="number"
            label="Asset Name"
          />
        </FormInputWrapper>
      </GridItem>
    </Grid>
  );
};

export default LifeExpectancyCurrentAge;
