import { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import {
  useGetReportableSystemContextTypesQuery,
  useSearchContextTypesMutation,
} from '~/lib/redux/services/systemcontexttypes.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';

interface SystemContextSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
  isInvalid?: boolean;
}

const SystemContextSelect = (props: SystemContextSelectProps) => {
  const {
    handleSelect,
    selectName,
    selectTitle,
    defaultInputValue,
    isInvalid,
  } = props;
  const [searchAsset] = useSearchContextTypesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  
  const { data, isLoading } = useGetReportableSystemContextTypesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });

  const searchReportableContextTypesCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'isReportable',
        columnValue: 'true',
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'displayName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="displayName"
      valueKey="systemContextTypeId"
      mutationFn={searchAsset}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultInputValue}
      specialSearch={searchReportableContextTypesCriterion}
      isInvalid={isInvalid}
    />
  );
};

export default SystemContextSelect;
