import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE, ROUTES } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { DataTable } from '@repo/ui/components';
import { ApprovalWorkflowRequest } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { useRouter } from 'next/navigation';
import { generateSearchCriteria } from '@repo/utils';
import { useSearchPendingApprovalRequestMutation } from '~/lib/redux/services/dashboard/executive.services';

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
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<ApprovalWorkflowRequest>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const router = useRouter();
  const [searchPendingApprovalRequest, { isLoading }] =
    useSearchPendingApprovalRequestMutation({});

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      undefined,
      {
        search: [search],
      },
      {
        search: {
          key: [
            'approvalTypeName',
            'requestedByUserFirstName',
            'requestedByUserName',
          ],
          operator: OPERATORS.Contains,
        },
      },
      undefined
    );
    const payload = {
      pageNumber,
      pageSize: customPageSize ?? pageSize,
      orCriterion,
    };

    const response = await handleSubmit(
      searchPendingApprovalRequest,
      payload,
      ''
    );
    setSearchData(response?.data);
  }, [searchPendingApprovalRequest, search, pageSize, pageNumber]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    handleSearch();
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
          header: 'Date Requested',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[searchData?.data?.items]] //eslint-disable-line
  );
  const ApprovalFlowPendingRequestTable = (
    <Flex width="full" direction="column">
      <DataTable
        columns={columns}
        data={searchData?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isLoading}
        showFooter={false}
        maxTdWidth="200px"
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
        handleSelectRow={(row) => {
          router.push(`/${ROUTES.APPROVAL}/${row.approvalRequestId}/detail`);
        }}
      />
    </Flex>
  );

  return {
    handleSearch,
    ApprovalFlowPendingRequestTable,
    totalPages: search && searchData ? searchData.data?.totalPages : 0,
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useApprovalFlowPendingRequestTable;
