import { Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';

interface Activities {
  timestamp: string;
  action: string;
  notes: string;
}

const recentActivities: Activities[] = [
  {
    timestamp: '2025-01-29T12:20:10Z',
    action: 'Maintenance',
    notes: 'Needed someTech Supplies for maintenance',
  },
  {
    timestamp: '2025-01-29T12:20:10Z',
    action: 'Maintenance',
    notes: 'Needed someTech Supplies for maintenance',
  },
  {
    timestamp: '2025-01-29T12:20:10Z',
    action: 'Maintenance',
    notes: 'Needed someTech Supplies for maintenance',
  },
  {
    timestamp: '2025-01-29T12:20:10Z',
    action: 'Maintenance',
    notes: 'Needed someTech Supplies for maintenance',
  },
];

const RecentActivities = () => {
  const columnHelper = createColumnHelper<Activities>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('timestamp', {
          cell: (info) => dateFormatter(info.getValue(), 'MMMM Do, YYYY'),
          header: 'Date',
          enableSorting: true,
        }),

        columnHelper.accessor('action', {
          cell: (info) => info.getValue(),
          header: 'Action',
          enableSorting: false,
        }),

        columnHelper.accessor('notes', {
          cell: (info) => info.getValue(),
          header: 'Notes',
          enableSorting: true,
        }),
      ];

      return baseColumns;
    },
    [[recentActivities]] //eslint-disable-line
  );

  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <Text size="md" fontWeight={700} color="primary.500">
        Recent Activities
      </Text>
      <DataTable
        columns={columns}
        data={recentActivities}
        isLoading={false}
        isFetching={false}
        showFooter={false}
        maxTdWidth="100px"
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
      />
    </VStack>
  );
};

export default RecentActivities;
