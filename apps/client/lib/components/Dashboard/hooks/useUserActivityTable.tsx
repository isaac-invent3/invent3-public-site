import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { Company } from '~/lib/interfaces/company.interfaces';
import { useSearchCompaniesMutation } from '~/lib/redux/services/company.services';
import { createColumnHelper } from '@tanstack/react-table';
import { UserActivity } from '~/lib/interfaces/dashboard/clientadmin.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import { DataTable } from '@repo/ui/components';
import { useGetUserActivityDataQuery } from '~/lib/redux/services/dashboard/clientadmin.services';

interface useUserActivityTable {
  search?: string;
  customPageSize?: number;
}

const useUserActivityTable = (props: useUserActivityTable) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetUserActivityDataQuery({
    pageNumber,
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
      //   handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  const columnHelper = createColumnHelper<UserActivity>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('dateCreated', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'YYYY-MM-DD hh:mma') ?? 'N/A',
          header: 'Timestamp',
          enableSorting: false,
        }),

        columnHelper.accessor('firstName', {
          cell: (info) =>
            info.getValue() || info.row.original.lastName
              ? `${info.getValue()} ${info.row.original.lastName}`
              : 'N/A',
          header: 'Name',
          enableSorting: false,
        }),

        columnHelper.accessor('userRoles', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Role',
          enableSorting: true,
        }),

        columnHelper.accessor('requestActionTypeName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Action',
          enableSorting: false,
        }),
        columnHelper.accessor('message', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Details',
          enableSorting: false,
        }),

        // columnHelper.accessor('ipAddress', {
        //   cell: (info) => info.getValue() ?? 'N/A',
        //   header: 'IP Address',
        //   enableSorting: false,
        // }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const UserActivityTable = (
    <Flex width="full" direction="column">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        showFooter={false}
        maxTdWidth="200px"
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
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
    UserActivityTable,
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

export default useUserActivityTable;
