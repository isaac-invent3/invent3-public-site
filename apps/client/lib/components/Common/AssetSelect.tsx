import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetallAssetQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';

interface AssetSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
}

const AssetSelect = (props: AssetSelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultInputValue } = props;
  const [searchAsset] = useSearchAssetsMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetallAssetQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="displayName"
      valueKey="assetId"
      mutationFn={searchAsset}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultInputValue}
    />
  );
};

export default AssetSelect;
