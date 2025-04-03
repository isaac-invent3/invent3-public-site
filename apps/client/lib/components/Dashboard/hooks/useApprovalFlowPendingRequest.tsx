import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DATE_PERIOD, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { Company } from '~/lib/interfaces/company.interfaces';
import { useSearchCompaniesMutation } from '~/lib/redux/services/company.services';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { DataTable } from '@repo/ui/components';
import { useGetPendingApprovalRequestQuery } from '~/lib/redux/services/dashboard/executive.services';
import { ApprovalWorkflowRequest } from '~/lib/interfaces/approvalWorkflow.interfaces';

interface useApprovalFlowPendingRequestTable {
  search?: string;
  customPageSize?: number;
}

const useApprovalFlowPendingRequestTable = (
  props: useApprovalFlowPendingRequestTable
) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetPendingApprovalRequestQuery({
    datePeriod: DATE_PERIOD.YEAR,
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

  const columnHelper = createColumnHelper<ApprovalWorkflowRequest>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('approvalRequestId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('approvalTypeName', {
          cell: (info) => info.getValue(),
          header: 'Request Type',
          enableSorting: false,
        }),
        columnHelper.accessor('requestedByUserFirstName', {
          cell: (info) =>
            `${info.getValue()} ${info.row.original.requestedByUserLastName}`,
          header: 'Submitted By',
          enableSorting: false,
        }),
        columnHelper.accessor('requestedByUserName', {
          cell: (info) => info.getValue(),
          header: 'Department',
          enableSorting: false,
        }),
        columnHelper.accessor('dateRequested', {
          cell: (info) => dateFormatter(info.getValue(), 'MMMM DD, YYYY'),
          header: 'Amount($)',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const ApprovalFlowPendingRequestTable = (
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
    ApprovalFlowPendingRequestTable,
    totalPages:
      search && searchData
        ? searchData.data?.totalPages
        : data?.data?.totalPages,

    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useApprovalFlowPendingRequestTable;
