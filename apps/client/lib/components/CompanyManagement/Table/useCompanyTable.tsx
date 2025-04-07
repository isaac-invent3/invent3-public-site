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
  companyApi,
  useGetAllCompaniesQuery,
  useSearchCompaniesMutation,
} from '~/lib/redux/services/company.services';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import useSignalR from '~/lib/hooks/useSignalR';
import { useAppDispatch } from '~/lib/redux/hooks';

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
  const dispatch = useAppDispatch();
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

  // SignalR Connection
  const connectionState = useSignalR('companies-hub');

  useSignalREventHandler({
    eventName: 'CreateCompany',
    connectionState,
    callback: (newCompany) => {
      // Update the query cache when a new company is received
      const parsedCompany = JSON.parse(newCompany);
      dispatch(
        companyApi.util.updateQueryData(
          'getAllCompanies',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft?.data?.items.unshift(parsedCompany); // Add new company to the beginning
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'UpdateCompany',
    connectionState,
    callback: (updatedCompany) => {
      // Update the query cache when a company is updated
      const parsedCompany = JSON.parse(updatedCompany);
      dispatch(
        companyApi.util.updateQueryData(
          'getAllCompanies',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              const index = draft.data.items.findIndex(
                (item) => item.companyId === parsedCompany.companyId
              );
              if (index !== -1) {
                draft.data.items[index] = parsedCompany;
              }
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'DeleteCompany',
    connectionState,
    callback: (deletedPlan) => {
      // Update the query cache when a company is deleted
      const parsedCompany = JSON.parse(deletedPlan);
      dispatch(
        companyApi.util.updateQueryData(
          'getAllCompanies',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.filter(
                (item) => item.companyId !== parsedCompany.companyId
              ); // Remove the deleted company
            }
          }
        )
      );
    },
  });

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
