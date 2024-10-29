import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllAssetGroupTypesQuery,
  useSearchAssetGroupTypesMutation,
} from '~/lib/redux/services/asset/groupType.services';

import { updatePlanForm } from '~/lib/redux/slices/MaintenanceSlice';

const AssetGroupType = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetGroupTypesQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchAssetGroupType] = useSearchAssetGroupTypesMutation({});
  const { typeName } = useAppSelector(
    (state) => state.maintenance.scheduleForm
  );
  const dispatch = useAppDispatch();
  return (
    <GenericAsyncSelect
      selectName="assetGroupTypeID"
      selectTitle="Group Type"
      data={data}
      labelKey="groupTypeName"
      valueKey="groupTypeId"
      defaultInputValue={typeName}
      mutationFn={searchAssetGroupType}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={(option) =>
        dispatch(updatePlanForm({ assetGroupTypeName: option.label }))
      }
    />
  );
};

export default AssetGroupType;
