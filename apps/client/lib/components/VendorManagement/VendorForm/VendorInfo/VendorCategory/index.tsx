import { useDisclosure, VStack } from '@chakra-ui/react';
import { FormAddButton, FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetVendorCategoriesQuery,
  useSearchVendorCategoriesMutation,
} from '~/lib/redux/services/vendor.services';
import { updateVendorForm } from '~/lib/redux/slices/VendorSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import VendorCategoryModal from './VendorCategoryModal';

const VendorCategory = () => {
  const [field, meta, helpers] = useField('vendorCategoryId'); //eslint-disable-line
  const [searchVendorCategories] = useSearchVendorCategoriesMutation({});
  const { vendorCategoryName } = useAppSelector(
    (state) => state.vendor.vendorForm
  );
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetVendorCategoriesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <>
      <FormInputWrapper
        sectionMaxWidth="133px"
        customSpacing="17px"
        description="Select Vendor Category"
        title="Vendor Category"
        isRequired
      >
        <VStack alignItems="flex-end" width="full">
          <GenericAsyncSelect
            selectName="vendorCategoryId"
            selectTitle="Vendor Category"
            data={data}
            labelKey="categoryName"
            valueKey="categoryId"
            mutationFn={searchVendorCategories}
            isLoading={isLoading || isFetching}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            handleSelect={(option) => {
              helpers.setValue(option.value);
              dispatch(updateVendorForm({ vendorCategoryName: option.label }));
            }}
            selectedOption={
              vendorCategoryName
                ? {
                    value: meta.value!,
                    label: vendorCategoryName,
                  }
                : undefined
            }
          />
          <FormAddButton handleClick={onOpen}>Add New Category</FormAddButton>
        </VStack>
      </FormInputWrapper>
      <VendorCategoryModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default VendorCategory;
