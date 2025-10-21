import { Grid, GridItem } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';
import React from 'react';
import FrequencySelect from '~/lib/components/Common/Frequency';

const MaintenanceFrequencyCost = () => {
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
          title="Maintenance Frequency"
          isRequired
          description="How often maintenance is done"
        >
          <FrequencySelect
            selectName="maintenanceFrequency"
            selectTitle="Frequency"
          />
        </FormInputWrapper>
      </GridItem>
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="200px"
          customSpacing="16px"
          title="Average Maintenance Cost (₦)"
          isRequired
          description="Enter the typical maintenance cost."
        >
          <Field
            as={FormTextInput}
            name="maintenanceCost"
            type="text"
            label="Maintenance Cost"
          />
        </FormInputWrapper>
      </GridItem>
    </Grid>
  );
};

export default MaintenanceFrequencyCost;
