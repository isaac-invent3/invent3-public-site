import { Option } from '@repo/interfaces';
import { FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllRolesQuery,
  useSearchRolesMutation,
} from '~/lib/redux/services/role.services';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const UserRole = () => {
  const [field, meta, helpers] = useField('userRoleId'); //eslint-disable-line
  const [searchRoles] = useSearchRolesMutation({});
  const dispatch = useAppDispatch();
  const { countryName } = useAppSelector((state) => state.asset.assetForm);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllRolesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="81px"
      description="Select User Role"
      title="User Role"
    >
      <GenericAsyncSelect
        selectName="userRoleIds"
        selectTitle="User Role"
        data={data}
        labelKey="roleName"
        valueKey="roleId"
        defaultInputValue={countryName}
        mutationFn={searchRoles}
        isLoading={isLoading || isFetching}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        handleSelect={(option) => {
          dispatch(
            updateUserForm({
              userRoleNames: (option as unknown as Option[]).map(
                (item) => item.label
              ),
            })
          );
        }}
        isMultiSelect
      />
    </FormInputWrapper>
  );
};

export default UserRole;
