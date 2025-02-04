import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllRolesQuery,
  useSearchRolesMutation,
} from '~/lib/redux/services/role.services';
import { updateVendorForm } from '~/lib/redux/slices/VendorSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const VendorCategory = () => {
  const [field, meta, helpers] = useField('categoryId'); //eslint-disable-line
  const [searchRoles] = useSearchRolesMutation({});
  const dispatch = useAppDispatch();
  const { countryName } = useAppSelector((state) => state.asset.assetForm);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllRolesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <FormInputWrapper
      sectionMaxWidth="133px"
      spacing="17px"
      description="Select Vendor Category"
      title="Vendor Category"
      isRequired
    >
      <VStack width="full" spacing="4px">
        <GenericAsyncSelect
          selectName="categoryId"
          selectTitle="Vendor Category"
          data={data}
          labelKey="roleName"
          valueKey="roleId"
          defaultInputValue={countryName}
          mutationFn={searchRoles}
          isLoading={isLoading}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          handleSelect={(option) => {
            helpers.setValue(option.value);
            dispatch(updateVendorForm({ categoryName: option.label }));
          }}
        />

        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default VendorCategory;
