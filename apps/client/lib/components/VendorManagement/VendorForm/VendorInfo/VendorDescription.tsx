import { FormInputWrapper, FormTextAreaInput } from '@repo/ui/components';
import { Field } from 'formik';
import React from 'react';

const VendorDescription = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="133px"
      customSpacing="17px"
      description="Enter Description about the vendor"
      title="Description"
      isRequired
    >
      <Field
        as={FormTextAreaInput}
        name="description"
        type="text"
        label="Description"
        placeholder="Description"
        customStyle={{ minHeight: '150px' }}
      />
    </FormInputWrapper>
  );
};

export default VendorDescription;
