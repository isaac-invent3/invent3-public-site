import { HStack, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Button, DataTable } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';
import { createColumnHelper } from '@tanstack/react-table';
import { Employee } from '~/lib/interfaces/user.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import { useGetAllEmployeesQuery } from '~/lib/redux/services/employees.services';

const UserActivity = () => {
  const { data, isLoading, isFetching } = useGetAllEmployeesQuery({
    pageNumber: 1,
    pageSize: 5,
  });

  const columnHelper = createColumnHelper<Employee>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('createdDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'YYYY-MM-DD hh:mma') ?? 'N/A',
          header: 'Timestamp',
          enableSorting: false,
        }),

        columnHelper.accessor('employeeName', {
          cell: (info) => info.getValue(),
          header: 'Name',
          enableSorting: false,
        }),

        columnHelper.accessor('roleId', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Role',
          enableSorting: true,
        }),

        columnHelper.accessor('phoneNumber', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Action',
          enableSorting: false,
        }),
        columnHelper.accessor('employeeLocation', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Details',
          enableSorting: false,
        }),

        columnHelper.accessor('createdDate', {
          cell: () => 'N/A',
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
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        maxTdWidth="200px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          fontWeight: 700,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </VStack>
  );
};

export default UserActivity;
