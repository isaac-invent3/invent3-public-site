import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DATE_PERIOD, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@repo/ui/components';
import { useGetTicketResolutionPerformanceQuery } from '~/lib/redux/services/dashboard/executive.services';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';

interface useTicketResolutionTable {
  search?: string;
  customPageSize?: number;
}

const useTicketResolutionTable = (props: useTicketResolutionTable) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { data, isLoading, isFetching } =
    useGetTicketResolutionPerformanceQuery({
      datePeriod: DATE_PERIOD.YEAR,
      pageSize: customPageSize ?? pageSize,
      pageNumber,
    });
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Ticket>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();

  //   const searchCriterion = {
  //     ...(search && {
  //       criterion: [
  //         {
  //           columnName: 'ticketTitle',
  //           columnValue: search,
  //           operation: OPERATORS.Contains,
  //         },
  //       ],
  //     }),
  //     pageNumber,
  //     pageSize,
  //   };

  //   const handleSearch = useCallback(async () => {
  //     const response = await handleSubmit(searchLog, searchCriterion, '');
  //     setSearchData(response?.data);
  //   }, [searchLog, searchCriterion]);

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
    [[data]] //eslint-disable-line
  );

  const TicketResolutionTable = (
    <Flex width="full" direction="column">
      <DataTable
        columns={columns}
        data={data?.data ?? []}
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
    // handleSearch,
    TicketResolutionTable,
    totalPages: search && searchData ? searchData.data?.totalPages : 1,
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useTicketResolutionTable;
