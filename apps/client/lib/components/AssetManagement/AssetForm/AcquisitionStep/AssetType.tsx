import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllAssetTypesQuery,
  useSearchAssetTypesMutation,
} from '~/lib/redux/services/asset/general.services';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';

const AssetTypeSelect = () => {
  const { assetTypeName } = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  const [searchType] = useSearchAssetTypesMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetTypesQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="assetTypeId"
      selectTitle="Asset Type"
      data={data}
      labelKey="typeName"
      valueKey="assetTypeId"
      mutationFn={searchType}
      defaultInputValue={assetTypeName}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={(option) =>
        dispatch(updateAssetForm({ assetTypeName: option.label }))
      }
    />
  );
};

export default AssetTypeSelect;
