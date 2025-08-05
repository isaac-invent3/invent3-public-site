import { FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllAssetTypesQuery,
  useSearchAssetTypesMutation,
} from '~/lib/redux/services/asset/types.services';
import { updateVendorForm } from '~/lib/redux/slices/VendorSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const VendorCategory = () => {
  const [field, meta, helpers] = useField('categoryId'); //eslint-disable-line
  const [searchRoles] = useSearchAssetTypesMutation({});
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllAssetTypesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <FormInputWrapper
      sectionMaxWidth="133px"
      customSpacing="17px"
      description="Select Vendor Category"
      title="Vendor Category"
      isRequired
    >
      <GenericAsyncSelect
        selectName="vendorCategoryId"
        selectTitle="Vendor Category"
        data={data}
        labelKey="typeName"
        valueKey="assetTypeId"
        mutationFn={searchRoles}
        isLoading={isLoading || isFetching}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        handleSelect={(option) => {
          helpers.setValue(option.value);
          dispatch(updateVendorForm({ vendorCategoryName: option.label }));
        }}
      />
    </FormInputWrapper>
  );
};

export default VendorCategory;
