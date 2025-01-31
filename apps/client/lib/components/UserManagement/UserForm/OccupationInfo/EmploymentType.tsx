import { VStack } from '@chakra-ui/react';
import {
  ErrorMessage,
  FormInputWrapper,
  FormSelect,
} from '@repo/ui/components';
import { useField } from 'formik';
import React from 'react';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';

const EmploymentTypeOptions = [
  {
    label: 'Full Time',
    value: 'full-time',
  },
  {
    label: 'Part Time',
    value: 'part-time',
  },
];
const EmploymentType = () => {
  const [field, meta, helpers] = useField('employmentTypeId'); //eslint-disable-line
  const dispatch = useAppDispatch();
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      spacing="81px"
      description="Select Employment Type"
      title="Employment Type"
    >
      <VStack width="full" spacing="4px">
        <FormSelect
          name="employmentTypeId"
          title="Employment Type"
          options={EmploymentTypeOptions}
          onSelect={(option) => {
            helpers.setValue(option.value as number);
            dispatch(updateUserForm({ employmentTypeName: option.label }));
          }}
          isLoading={false}
          isSearchable
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default EmploymentType;
