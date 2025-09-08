import { VStack } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import {
  ErrorMessage,
  FormInputWrapper,
  FormSelect,
} from '@repo/ui/components';
import { useField } from 'formik';
import React from 'react';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import { EMPLOYEE_TYPE_ENUM } from '~/lib/utils/constants';

const EmploymentTypeOptions = [
  {
    label: 'Full Time',
    value: EMPLOYEE_TYPE_ENUM.FULL_TIME,
  },
  {
    label: 'Part Time',
    value: EMPLOYEE_TYPE_ENUM.PART_TIME,
  },
];
const EmploymentType = () => {
  const [field, meta, helpers] = useField('employmentTypeId'); //eslint-disable-line
  const dispatch = useAppDispatch();
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="36px"
      description="Select Employment Type"
      title="Employment Type"
    >
      <VStack width="full" spacing="4px">
        <FormSelect
          name="employmentTypeId"
          title="Employment Type"
          options={EmploymentTypeOptions}
          onSelect={(option) => {
            helpers.setValue((option as Option).value as number);
            dispatch(
              updateUserForm({ employmentTypeName: (option as Option).label })
            );
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
