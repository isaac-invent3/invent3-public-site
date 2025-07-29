import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllAssetStatusQuery,
  useSearchStatusMutation,
} from '~/lib/redux/services/asset/general.services';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const AssetStatusSelect = () => {
  const { statusName } = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  const [searchStatus] = useSearchStatusMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllAssetStatusQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="statusId"
      selectTitle="Asset Status"
      data={data}
      labelKey="statusName"
      valueKey="statusId"
      mutationFn={searchStatus}
      isLoading={isLoading || isFetching}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      defaultInputValue={statusName}
      handleSelect={(option) =>
        dispatch(updateAssetForm({ statusName: option.label }))
      }
    />
  );
};

export default AssetStatusSelect;
