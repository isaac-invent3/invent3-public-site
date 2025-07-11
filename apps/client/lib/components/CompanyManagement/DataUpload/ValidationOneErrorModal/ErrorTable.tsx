import { Heading, Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';

interface ErrorTableProps {
  title: string;
  subtitle: string;
  columnsInfo: string[];
}
const ErrorTable = (props: ErrorTableProps) => {
  const { title, subtitle, columnsInfo } = props;

  const rows: { tab: string; column: string }[] = columnsInfo.map((value) => ({
    tab: 'Assets',
    column: value,
  }));

  const columnHelper = createColumnHelper<{ tab: string; column: string }>();

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('tab', {
          cell: (info) => info.getValue(),
          header: 'Tab',
          enableSorting: false,
        }),
        columnHelper.accessor('column', {
          cell: (info) => info.getValue(),
          header: 'Column',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [[columnsInfo]] //eslint-disable-line
  );

  return (
    <VStack width="full" spacing="16px">
      <VStack spacing="4px" alignItems="flex-start" width="full">
        <Heading color="primary.500" size="sm">
          {title}
        </Heading>
        <Text color="primary.accent">{subtitle}</Text>
      </VStack>
      <DataTable
        columns={columns}
        data={rows ?? []}
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
      />
    </VStack>
  );
};

export default ErrorTable;
