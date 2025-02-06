import { SimpleGrid } from '@chakra-ui/react';
import { FormDatePicker, FormInputWrapper } from '@repo/ui/components';
import React from 'react';

const ContractStartEndDate = () => {
  return (
    <SimpleGrid width="full" columns={2} spacing="27px">
      <FormInputWrapper
        sectionMaxWidth="141px"
        customSpacing="24px"
        description="Choose when the Contract will begin"
        title="Contract Start Date"
        isRequired
      >
        <FormDatePicker
          name="contractStartDate"
          label="Select Date"
          maxDate={new Date()}
          showPredefinedDate
        />
      </FormInputWrapper>
      <FormInputWrapper
        sectionMaxWidth="141px"
        customSpacing="24px"
        description="Provide essential information about the contact person being added."
        title="Contract Expiry Date"
        isRequired
      >
        <FormDatePicker name="contractEndDate" label="Select Date" />
      </FormInputWrapper>
    </SimpleGrid>
  );
};

export default ContractStartEndDate;
