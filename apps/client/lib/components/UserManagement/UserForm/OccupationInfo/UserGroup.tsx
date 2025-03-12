import { Option } from '@repo/interfaces';
import { FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React from 'react';
import UserGroupSelect from '~/lib/components/Common/SelectComponents/UserGroup';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';

const UserGroup = () => {
  const [field, meta, helpers] = useField('userGroupIds'); //eslint-disable-line
  const dispatch = useAppDispatch();
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="81px"
      description="Select User Group"
      title="User Group"
    >
      <UserGroupSelect
        selectTitle="User Group"
        selectName="userGroupIds"
        handleSelect={(option) => {
          dispatch(
            updateUserForm({
              userGroupNames: (option as unknown as Option[]).map(
                (item) => item.label
              ),
            })
          );
        }}
      />
    </FormInputWrapper>
  );
};

export default UserGroup;
