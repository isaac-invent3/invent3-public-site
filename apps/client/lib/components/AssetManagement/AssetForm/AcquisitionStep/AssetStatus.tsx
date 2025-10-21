import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllNonSystemAssetStatusQuery } from '~/lib/redux/services/asset/general.services';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const AssetStatusSelect = () => {
  const { statusName } = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllNonSystemAssetStatusQuery({
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
      mutationFn={undefined}
      isLoading={isLoading || isFetching}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      defaultInputValue={statusName}
      handleSelect={(option) =>
        dispatch(updateAssetForm({ statusName: option?.label }))
      }
      isSearchable={false}
    />
  );
};

export default AssetStatusSelect;
