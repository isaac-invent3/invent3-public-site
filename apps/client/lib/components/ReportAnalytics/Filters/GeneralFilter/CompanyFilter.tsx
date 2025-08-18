import { FilterDropDown } from '@repo/ui/components';
import React, { useEffect, useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useGetAllCompaniesQuery } from '~/lib/redux/services/company.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface CompanyFilterProps {
  selectedOptions: Option[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedOption: (option: Option) => void;
}
const CompanyFilter = (props: CompanyFilterProps) => {
  const { selectedOptions, handleSelectedOption } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const { data, isLoading, isFetching } = useGetAllCompaniesQuery({
    pageNumber: pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    if (data?.data?.items) {
      const newCompanies = generateOptions(
        data?.data?.items,
        'companyName',
        'companyId'
      );
      setOptions((prev) => [...prev, ...newCompanies]);
    }
  }, [data]);

  return (
    <FilterDropDown
      label="Company:"
      options={options}
      selectedOptions={selectedOptions}
      handleClick={(value) => handleSelectedOption(value)}
      hasMoreOptions={data?.data?.hasNextPage}
      loadMoreOptions={() => setPageNumber((prev) => prev + 1)}
      isLoading={isLoading || isFetching}
    />
  );
};

export default CompanyFilter;
