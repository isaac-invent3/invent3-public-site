import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React from 'react';
import UserGroupSelect from '~/lib/components/Common/SelectComponents/UserGroup';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';

const Team = () => {
  const [field, meta, helpers] = useField('teamId'); //eslint-disable-line
  const dispatch = useAppDispatch();
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="81px"
      description="Select Team"
      title="Team"
    >
      <VStack width="full" spacing="4px">
        <UserGroupSelect
          selectTitle="Team"
          selectName="teamId"
          handleSelect={(option) => {
            helpers.setValue(option.value);
            dispatch(updateUserForm({ userGroupNames: [option.label] }));
          }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default Team;
