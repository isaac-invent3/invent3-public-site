import {
  ErrorMessage,
  FormInputWrapper,
  SelectableButtonGroup,
} from '@repo/ui/components';
import { useField } from 'formik';
import React from 'react';

const Gender = () => {
  const [field, meta, helpers] = useField('gender'); //eslint-disable-line
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      customSpacing="65px"
      description="User's Gender"
      title="Gender"
    >
      <SelectableButtonGroup
        options={[
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ]}
        selectedOptions={[{ value: meta.value, label: meta.value }]}
        handleSelect={(options) => {
          helpers.setValue(options[0]?.value);
        }}
        isMultiSelect={false}
        buttonVariant="secondary"
        customButtonStyle={{ width: 'max-content' }}
      />
      {meta.touched && meta.error !== undefined && (
        <ErrorMessage>{meta.error}</ErrorMessage>
      )}
    </FormInputWrapper>
  );
};

export default Gender;
