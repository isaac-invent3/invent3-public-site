import { VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';

interface Log {
  logId: string;
  timestamp: string;
  action: string;
  user: string;
  status: string;
}

const logs: Log[] = [
  {
    logId: 'LOG001',
    timestamp: '2025-01-29T08:30:00Z',
    action: 'Updated Vendor Name',
    user: 'John Doe',
    status: 'Success',
  },
  {
    logId: 'LOG002',
    timestamp: '2025-01-29T09:15:45Z',
    action: 'Deleted User Account',
    user: 'Admin',
    status: 'Success',
  },
  {
    logId: 'LOG003',
    timestamp: '2025-01-29T10:05:22Z',
    action: 'Created New Asset',
    user: 'Jane Smith',
    status: 'Pending',
  },
  {
    logId: 'LOG004',
    timestamp: '2025-01-29T11:45:30Z',
    action: 'Updated Maintenance Schedule',
    user: 'Michael Brown',
    status: 'Failed',
  },
  {
    logId: 'LOG005',
    timestamp: '2025-01-29T12:20:10Z',
    action: 'Approved Compliance Report',
    user: 'Sarah Johnson',
    status: 'Success',
  },
];
const RelatedLogs = () => {
  const columnHelper = createColumnHelper<Log>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('logId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: true,
        }),

        columnHelper.accessor('timestamp', {
          cell: (info) => dateFormatter(info.getValue(), 'MMMM Do, HH:mm UTC'),
          header: 'Timestamp',
          enableSorting: true,
        }),

        columnHelper.accessor('action', {
          cell: (info) => info.getValue(),
          header: 'Action',
          enableSorting: false,
        }),

        columnHelper.accessor('user', {
          cell: (info) => info.getValue(),
          header: 'User',
          enableSorting: true,
        }),

        columnHelper.accessor('status', {
          cell: (info) => (
            <span
              style={{
                color:
                  info.getValue() === 'Success'
                    ? 'green'
                    : info.getValue() === 'Failed'
                      ? 'red'
                      : 'orange',
              }}
            >
              {info.getValue()}
            </span>
          ),
          header: 'Status',
          enableSorting: true,
        }),
      ];

      return baseColumns;
    },
    [[logs]] //eslint-disable-line
  );

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <DataTable
        columns={columns}
        data={logs}
        isLoading={false}
        isFetching={false}
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

export default RelatedLogs;
