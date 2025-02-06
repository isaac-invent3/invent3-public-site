import { FormDatePicker, FormInputWrapper } from '@repo/ui/components';
import React from 'react';

const DateOfBirth = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      customSpacing="65px"
      description="Select Date of Birth"
      title="Date of Birth"
    >
      <FormDatePicker
        name="dob"
        label="Select Date of Birth"
        maxDate={new Date()}
      />
    </FormInputWrapper>
  );
};

export default DateOfBirth;
