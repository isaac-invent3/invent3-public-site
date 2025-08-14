import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@repo/ui/components';
import { useSearchTicketResolutionPerformanceMutation } from '~/lib/redux/services/dashboard/executive.services';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { generateSearchCriteria } from '@repo/utils';
import { OPERATORS } from '@repo/constants';

interface useTicketResolutionTable {
  search?: string;
  customPageSize?: number;
}

const useTicketResolutionTable = (props: useTicketResolutionTable) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { handleSubmit } = useCustomMutation();

  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Ticket>> | undefined
  >(undefined);
  const [searchTicketResolution, { isLoading }] =
    useSearchTicketResolutionPerformanceMutation({});

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      undefined,
      {
        search: [search],
      },
      {
        search: {
          key: ['ticketTypeName', 'ticketPriorityName', 'assignedTo'],
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

    const response = await handleSubmit(searchTicketResolution, payload, '');
    setSearchData(response?.data);
  }, [searchTicketResolution, search, pageSize, pageNumber]);

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

  const columnHelper = createColumnHelper<Ticket>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('ticketId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('ticketTypeName', {
          cell: (info) => info.getValue(),
          header: 'Type',
          enableSorting: false,
        }),
        columnHelper.accessor('ticketPriorityName', {
          cell: (info) => info.getValue(),
          header: 'Priority',
          enableSorting: false,
        }),
        columnHelper.accessor('assignedTo', {
          cell: (info) => info.getValue(),
          header: 'Assigned To',
          enableSorting: false,
        }),
        columnHelper.accessor('statusName', {
          cell: (info) => info.getValue(),
          header: 'Status',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[searchData?.data?.items]] //eslint-disable-line
  );

  const TicketResolutionTable = (
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
      />
    </Flex>
  );
  //   const Filter = (
  //     <Flex width="full" pb="16px">
  //       <GeneralFilter handleApplyFilter={handleSearch} />
  //     </Flex>
  //   );
  return {
    // handleSearch,
    TicketResolutionTable,
    totalPages: search && searchData ? searchData.data?.totalPages : 0,
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useTicketResolutionTable;
