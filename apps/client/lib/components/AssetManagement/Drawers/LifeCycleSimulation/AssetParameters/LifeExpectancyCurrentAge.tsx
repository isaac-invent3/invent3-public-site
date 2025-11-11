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
          description="Enter how long the asset is expected to last."
        >
          <Field
            as={FormTextInput}
            name="expectedUsefulLife"
            type="number"
            label="Expected Useful Life"
            placeholder="Expected Useful Life in Years"
          />
        </FormInputWrapper>
      </GridItem>
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="141px"
          customSpacing="16px"
          title="Current Age"
          isRequired
          description="Enter how old the asset is."
        >
          <Field
            as={FormTextInput}
            name="currentAge"
            type="number"
            label="Current Age"
            placeholder="Current Age in Years"
          />
        </FormInputWrapper>
      </GridItem>
    </Grid>
  );
};

export default LifeExpectancyCurrentAge;
