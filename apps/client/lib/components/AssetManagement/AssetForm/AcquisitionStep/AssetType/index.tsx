import { useDisclosure, VStack } from '@chakra-ui/react';
import { FormAddButton } from '@repo/ui/components';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useCreateAssetTypeMutation,
  useGetAllAssetTypesQuery,
  useSearchAssetTypesMutation,
} from '~/lib/redux/services/asset/types.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import AssetTypeModal from './AssetTypeModal';
import { useField } from 'formik';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { AssetTypePayload } from '~/lib/interfaces/asset/type.interface';

interface AssetTypeSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
}

const AssetTypeSelect = (props: AssetTypeSelectProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { handleSelect, selectName, selectTitle, defaultInputValue } = props;
  const [searchAssetType] = useSearchAssetTypesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const [field, meta, helpers] = useField('assetTypeId');
  const { assetTypeName } = useAppSelector((state) => state.asset.assetForm);
  const { data, isLoading, isFetching } = useGetAllAssetTypesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  const dispatch = useAppDispatch();
  const [createAssetType] = useCreateAssetTypeMutation({});
  const { handleSubmit } = useCustomMutation();

  const handleAddAssetType = async (payload: AssetTypePayload) => {
    const response = await handleSubmit(createAssetType, payload, '');
    if (response?.data) {
      helpers.setValue(response?.data?.data?.assetTypeId);
      dispatch(
        updateAssetForm({
          assetTypeName: response?.data?.data?.typeName!,
        })
      );
      onClose();
    }
  };
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <GenericAsyncSelect
          selectName={selectName}
          selectTitle={selectTitle}
          data={data}
          labelKey="typeName"
          valueKey="assetTypeId"
          mutationFn={searchAssetType}
          isLoading={isLoading || isFetching}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          handleSelect={handleSelect}
          defaultInputValue={defaultInputValue}
          selectedOption={
            assetTypeName
              ? {
                  value: meta.value!,
                  label: assetTypeName,
                }
              : undefined
          }
        />
        <FormAddButton handleClick={onOpen}>Add New Asset Type</FormAddButton>
      </VStack>
      <AssetTypeModal
        isOpen={isOpen}
        onClose={onClose}
        handleAdd={(payload: AssetTypePayload) => handleAddAssetType(payload)}
      />
    </>
  );
};

export default AssetTypeSelect;
