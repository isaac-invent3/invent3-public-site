import { HStack, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Button, DataTable } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { useGetUserActivityDataQuery } from '~/lib/redux/services/dashboard/clientadmin.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { UserActivity } from '~/lib/interfaces/dashboard/clientadmin.interfaces';

const UserActivityTable = () => {
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const { data, isLoading, isFetching } = useGetUserActivityDataQuery({
    countryId: +selectedCountry?.value!,
    regionId: (selectedState?.value as number) ?? undefined,
  });

  const columnHelper = createColumnHelper<UserActivity>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('timeStamp', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'YYYY-MM-DD hh:mma') ?? 'N/A',
          header: 'Timestamp',
          enableSorting: false,
        }),

        columnHelper.accessor('name', {
          cell: (info) => info.getValue(),
          header: 'Name',
          enableSorting: false,
        }),

        columnHelper.accessor('designation', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Role',
          enableSorting: true,
        }),

        columnHelper.accessor('action', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Action',
          enableSorting: false,
        }),
        columnHelper.accessor('details', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Details',
          enableSorting: false,
        }),

        columnHelper.accessor('ipAddress', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'IP Address',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  return (
    <VStack
      width="full"
      height="full"
      pl="16px"
      pr="15px"
      pt="21px"
      pb="12px"
      alignItems="flex-start"
      bgColor="white"
      rounded="8px"
      spacing="16px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>User Activity</CardHeader>
        <Button
          href={`/${ROUTES.TICKETS}`}
          customStyles={{
            py: 0,
            height: '28px',
            width: '68px',
            fontSize: '12px',
            lineHeight: '14.26px',
          }}
        >
          View All
        </Button>
      </HStack>
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
    </VStack>
  );
};

export default UserActivityTable;
