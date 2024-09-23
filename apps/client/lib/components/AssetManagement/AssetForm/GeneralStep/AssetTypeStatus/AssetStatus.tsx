import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch } from '~/lib/redux/hooks';
import {
  useGetAllStatusQuery,
  useSearchStatusMutation,
} from '~/lib/redux/services/asset/general.services';
import { updateAssetForm } from '~/lib/redux/slices/assetSlice';

const AssetStatusSelect = () => {
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
      handleSelect={(option) =>
        dispatch(updateAssetForm({ assetTypeName: option.label }))
      }
    />
  );
};

export default AssetStatusSelect;
