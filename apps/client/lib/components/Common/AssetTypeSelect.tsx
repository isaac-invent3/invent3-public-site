import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllAssetTypesQuery,
  useSearchAssetTypesMutation,
} from '~/lib/redux/services/asset/types.services';

interface AssetTypeSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
}

const AssetTypeSelect = (props: AssetTypeSelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultInputValue } = props;
  const [searchAssetType] = useSearchAssetTypesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetTypesQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="typeName"
      valueKey="assetTypeId"
      mutationFn={searchAssetType}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultInputValue}
    />
  );
};

export default AssetTypeSelect;
