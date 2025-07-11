import { Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';

const ValidationTwoError = () => {
  const columnHelper = createColumnHelper<{ [key: string]: React.ReactNode }>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('tab', {
        cell: (info) => info.getValue(),
        header: 'Tab',
        enableSorting: false,
      }),
      columnHelper.accessor('cell', {
        cell: (info) => info.getValue(),
        header: 'Cell',
        enableSorting: false,
      }),
      columnHelper.accessor('code', {
        cell: (info) => info.getValue(),
        header: 'Error Code',
        enableSorting: false,
      }),
      columnHelper.accessor('action', {
        cell: (info) => info.getValue(),
        header: 'Action',
        enableSorting: false,
      }),
    ],
    [] //eslint-disable-line
  );

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <Text size="md" fontWeight={700}>
        <Text as="span" color="error.500" size="md" fontWeight={700}>
          10 {''}
        </Text>
        items failed - Validating Template Phase 2
      </Text>
      <DataTable
        columns={columns}
        data={[]}
        showFooter={false}
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
        customTableContainerStyle={{ rounded: '4px' }}
      />
    </VStack>
  );
};

export default ValidationTwoError;
