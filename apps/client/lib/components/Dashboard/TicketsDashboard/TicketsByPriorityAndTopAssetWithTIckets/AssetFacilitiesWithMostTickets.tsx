import { HStack, useMediaQuery, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import CardHeader from '../../Common/CardHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetTopTicketCountQuery } from '~/lib/redux/services/dashboard/ticketDashboard.services';
import { TicketCountByFacility } from '~/lib/interfaces/dashboard/ticket.interfaces';

const AssetFacilitiesWithMostTickets = () => {
  const columnHelper = createColumnHelper<TicketCountByFacility>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } = useGetTopTicketCountQuery({
    facilityIds: filters?.facilities,
    assetCategoryIds: filters?.assetCategories,
    ticketTypes: filters?.ticketTypes,
    datePeriod: filters?.datePeriod?.[0],
  });
  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('facility', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Facility',
          enableSorting: false,
        }),
        columnHelper.accessor('ticketCount', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Ticket Count',
          enableSorting: false,
        }),
        columnHelper.accessor('slaCompliance', {
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
    [data?.data] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('facility', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Facility',
          enableSorting: false,
        }),
        columnHelper.accessor('ticketCount', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Ticket Count',
          enableSorting: false,
        }),
        columnHelper.accessor('avgResolutionTime', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Avg Resolution Time (hrs)',
          enableSorting: false,
        }),
        columnHelper.accessor('slaCompliance', {
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
    [data?.data] //eslint-disable-line
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
        data={data?.data ?? []}
        showFooter={false}
        isLoading={isLoading}
        isFetching={isFetching}
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
