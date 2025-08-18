import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllCompaniesQuery,
  useSearchCompaniesMutation,
} from '~/lib/redux/services/company.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface CompanySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
  isInvalid?: boolean;
}

const CompanySelect = (props: CompanySelectProps) => {
  const {
    handleSelect,
    selectName,
    selectTitle,
    defaultInputValue,
    isInvalid,
  } = props;
  const [searchCompanies] = useSearchCompaniesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllCompaniesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="companyName"
      valueKey="tenantName"
      mutationFn={searchCompanies}
      isLoading={isLoading || isFetching}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultInputValue}
      isInvalid={isInvalid}
    />
  );
};

export default CompanySelect;
