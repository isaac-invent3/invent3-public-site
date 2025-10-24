import { Grid, GridItem } from '@chakra-ui/react';
import {
  FormInputWrapper,
  FormSelect,
  FormTextInput,
} from '@repo/ui/components';
import { Field } from 'formik';
import React from 'react';
import FrequencySelect from '~/lib/components/Common/Frequency';

const CustomDetail = () => {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={{ base: '24px' }}
      width="full"
    >
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="197px"
          customSpacing="16px"
          title="Custom Schedule Frequency"
          isRequired
          description="Choose how often depreciation applies within the simulation period."
        >
          <FrequencySelect selectName="scheduleType" selectTitle="Frequency" />
        </FormInputWrapper>
      </GridItem>
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="164px"
          customSpacing="16px"
          title="Initial Depreciation Rate"
          isRequired
          description="Set the starting depreciation percentage for the first period."
        >
          <Field
            as={FormTextInput}
            name="initialDepreciationRate"
            type="number"
            label="Depreciation Rate"
          />
        </FormInputWrapper>
      </GridItem>
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="197px"
          customSpacing="16px"
          title="Adjustment Curve"
          isRequired
          description="Controls how depreciation rate changes across the asset’s lifespan."
        >
          <FormSelect
            name="adjustmentCurve"
            title="Adjustment Curve"
            options={[
              { label: 'Linear', value: 1 },
              { label: 'Exponential', value: 2 },
              { label: 'Step-down', value: 3 },
            ]}
            showTitleAfterSelect={false}
          />
        </FormInputWrapper>
      </GridItem>
    </Grid>
  );
};

export default CustomDetail;
