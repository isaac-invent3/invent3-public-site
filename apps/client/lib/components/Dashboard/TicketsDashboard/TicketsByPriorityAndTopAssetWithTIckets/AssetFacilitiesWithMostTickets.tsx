import { HStack, useMediaQuery, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useGetTicketsByTabScopeQuery } from '~/lib/redux/services/ticket.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';

const AssetFacilitiesWithMostTickets = () => {
  const columnHelper = createColumnHelper<Ticket>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetTicketsByTabScopeQuery({
    pageNumber,
    pageSize: 5,
  });

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Asset / Facility',
          enableSorting: false,
        }),
        columnHelper.accessor('totalTasksCount', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Ticket Count',
          enableSorting: false,
        }),
        columnHelper.accessor('openTasks', {
          cell: (info) => (
            <GenericStatusBox
              text={info.getValue()?.toString() ?? ''}
              showDot={false}
              rounded="8px"
            />
          ),
          header: 'SLA Compliance %',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Asset / Facility',
          enableSorting: false,
        }),
        columnHelper.accessor('totalTasksCount', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Ticket Count',
          enableSorting: false,
        }),
        columnHelper.accessor('roomRef', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Avg Resolution Time (hrs)',
          enableSorting: false,
        }),
        columnHelper.accessor('openTasks', {
          cell: (info) => (
            <GenericStatusBox
              text={info.getValue()?.toString() ?? ''}
              showDot={false}
              rounded="8px"
            />
          ),
          header: 'SLA Compliance %',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  return (
    <VStack
      height="full"
      p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <CardHeader>Top 5 Assets / Facilities with Most Tickets</CardHeader>
      </HStack>
      <DataTable
        columns={isMobile ? mobileColumns : columns}
        data={data?.data?.items ?? []}
        showFooter={data?.data ? data?.data?.totalPages > 1 : false}
        isLoading={isLoading}
        isFetching={isFetching}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        emptyLines={3}
        maxTdWidth="250px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '17px',
          paddingBottom: '17px',
          fontWeight: 700,
          bgColor: '#B4BFCA',
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '16px',
          paddingBottom: '16px',
        }}
        customTBodyRowStyle={{ verticalAlign: 'top' }}
        customTableContainerStyle={{
          rounded: '4px',
        }}
      />
    </VStack>
  );
};

export default AssetFacilitiesWithMostTickets;
