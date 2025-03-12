import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllAssetQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

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
  const { data, isLoading } = useGetAllAssetQuery({
    pageSize: DEFAULT_PAGE_SIZE,
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
