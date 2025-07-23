import { Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { AuditChanges } from '~/lib/interfaces/log.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAllAuditRecordChangesQuery } from '~/lib/redux/services/log.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface ChangeLog {
  field: string;
  beforeChange: string;
  afterChange: string;
}

const changeLog: ChangeLog[] = [
  {
    field: 'Vendor Name',
    beforeChange: 'Tech Solutions Ltd',
    afterChange: 'Tech Supplies',
  },
  {
    field: 'Contact Person',
    beforeChange: 'John Doe',
    afterChange: 'Jane Smith',
  },
  {
    field: 'Email',
    beforeChange: 'support@techsolutions.com',
    afterChange: 'contact@techsupplies.com',
  },
  {
    field: 'Phone Number',
    beforeChange: '+1 123-456-7890',
    afterChange: '+1 987-654-3210',
  },
  {
    field: 'Address',
    beforeChange: '123 Tech Street, NY',
    afterChange: '456 Supply Road, CA',
  },
];

const ChangedData = () => {
  const auditRecord = useAppSelector((state) => state.auditLog.auditLog);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllAuditRecordChangesQuery(
    {
      pageNumber,
      pageSize,
      auditRecordId: auditRecord?.auditRecordId!,
    },
    { skip: !auditRecord?.auditRecordId }
  );
  const columnHelper = createColumnHelper<AuditChanges>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('fieldName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Field',
          enableSorting: false,
        }),

        columnHelper.accessor('beforeChanges', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Before Change',
          enableSorting: true,
        }),

        columnHelper.accessor('afterChanges', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'After Change',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[changeLog]] //eslint-disable-line
  );

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <Text size="md" fontWeight={700} color="primary.500">
        Data Changed
      </Text>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        showFooter={false}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
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

export default ChangedData;
