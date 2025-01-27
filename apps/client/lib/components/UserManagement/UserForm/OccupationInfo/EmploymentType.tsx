import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React from 'react';
import CountrySelect from '~/lib/components/Common/SelectComponents/Location/CountrySelect';

const EmploymentType = () => {
  const [field, meta, helpers] = useField('employmentType'); //eslint-disable-line
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      spacing="81px"
      description="Select Employment Type"
      title="Employment Type"
    >
      <VStack width="full" spacing="4px">
        <CountrySelect
          handleSelect={(option) => {
            helpers.setValue(option.value);
          }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default EmploymentType;
