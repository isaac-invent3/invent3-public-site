import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllStatusQuery,
  useSearchStatusMutation,
} from '~/lib/redux/services/asset/general.services';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';

const AssetStatusSelect = () => {
  const { statusName } = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  const [searchStatus] = useSearchStatusMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllStatusQuery({
    pageSize: 25,
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
      isLoading={isLoading}
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
