import { useDisclosure, VStack } from '@chakra-ui/react';
import { FormAddButton } from '@repo/ui/components';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllAssetTypesQuery,
  useSearchAssetTypesMutation,
} from '~/lib/redux/services/asset/types.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import AssetTypeModal from './AssetTypeModal';
import { useField } from 'formik';
import { useAppSelector } from '~/lib/redux/hooks';

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
      <AssetTypeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AssetTypeSelect;
