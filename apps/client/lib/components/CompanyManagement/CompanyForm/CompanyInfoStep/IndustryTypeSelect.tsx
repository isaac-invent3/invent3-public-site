import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllIndustriesQuery,
  useSearchIndustriesMutation,
} from '~/lib/redux/services/industry.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface IndustryTypeSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
}

const IndustryTypeSelect = (props: IndustryTypeSelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultInputValue } = props;
  const [searchAssetType] = useSearchIndustriesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllIndustriesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="industryName"
      valueKey="industryId"
      mutationFn={searchAssetType}
      isLoading={isLoading || isFetching}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultInputValue}
    />
  );
};

export default IndustryTypeSelect;
