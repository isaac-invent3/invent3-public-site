import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';
import React from 'react';

const VendorName = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="133px"
      customSpacing="17px"
      description="Enter the vendors full name."
      title="Vendor Name"
      isRequired
    >
      <Field
        as={FormTextInput}
        name="vendorName"
        type="text"
        label="Vendor Name"
        placeholder="Vendor Name"
      />
    </FormInputWrapper>
  );
};

export default VendorName;
