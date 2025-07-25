import { Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { AuditChanges } from '~/lib/interfaces/log.interfaces';

interface ChangedDataProps {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  data?: AuditChanges[];
}
const ChangedData = (props: ChangedDataProps) => {
  const { pageNumber, setPageNumber, pageSize, setPageSize, data } = props;

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
    [[data]] //eslint-disable-line
  );

  return (
    <VStack
      width="full"
      alignItems="flex-start"
      spacing="8px"
      px={{ base: '16px', lg: '32px' }}
      display={data && data?.length > 0 ? 'flex' : 'none'}
    >
      <Text size="md" fontWeight={700} color="primary.500">
        Data Changed
      </Text>
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={false}
        isFetching={false}
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
