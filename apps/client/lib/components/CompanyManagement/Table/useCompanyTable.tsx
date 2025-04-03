import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import CompanyTable from './CompanyTable';
import { Company } from '~/lib/interfaces/company.interfaces';
import {
  useGetAllCompaniesQuery,
  useSearchCompaniesMutation,
} from '~/lib/redux/services/company.services';

interface useCompanyTable {
  search?: string;
  showFooter?: boolean;
  customPageSize?: number;
  emptyLine?: number;
}

const useCompanyTable = (props: useCompanyTable) => {
  const { search, showFooter = true, customPageSize, emptyLine } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllCompaniesQuery({
    pageNumber: pageNumber,
    pageSize: customPageSize ?? pageSize,
  });
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Company>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchLog, { isLoading: searchLoading }] = useSearchCompaniesMutation(
    {}
  );

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'companyName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchLog, searchCriterion, '');
    setSearchData(response?.data);
  }, [searchLog, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  const CompanyInfoTable = (
    <Flex width="full" direction="column">
      <CompanyTable
        data={search ? searchData : data}
        isFetching={isFetching || searchLoading}
        isLoading={isLoading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        showFooter={showFooter}
        emptyLines={emptyLine ?? 25}
      />
    </Flex>
  );
  //   const Filter = (
  //     <Flex width="full" pb="16px">
  //       <GeneralFilter handleApplyFilter={handleSearch} />
  //     </Flex>
  //   );
  return {
    handleSearch,
    CompanyInfoTable,
    totalPages:
      search && searchData
        ? searchData.data?.totalPages
        : (data?.data?.totalPages ?? 0),
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useCompanyTable;
