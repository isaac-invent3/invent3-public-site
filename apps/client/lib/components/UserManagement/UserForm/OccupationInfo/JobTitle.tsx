import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React from 'react';
import CountrySelect from '~/lib/components/Common/SelectComponents/Location/CountrySelect';

const JobTitle = () => {
  const [field, meta, helpers] = useField('jobTitle'); //eslint-disable-line
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      spacing="81px"
      description="Select Job Title"
      title="Job Title"
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

export default JobTitle;
