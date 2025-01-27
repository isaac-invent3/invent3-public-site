import { Flex } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { AuditLog } from '~/lib/interfaces/log.interfaces';

interface LogTableProps extends GenericTableProps {
  data: AuditLog[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: AuditLog) => void;
}

const LogTable = (props: LogTableProps) => {
  const {
    data,
    isFetching,
    isLoading,
    isSelectable,
    selectMultipleRows,
    pageNumber,
    pageSize,
    disabledRows,
    showFooter,
    emptyText,
    emptyLines,
    totalPages,
    selectedRows,
    showEmptyState,
    handleSelectRow,
    setPageNumber,
    setPageSize,
    setSelectedRows,
  } = props;

  const columnHelper = createColumnHelper<AuditLog>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('logMessageId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),

        columnHelper.accessor('logMessage', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Log Message',
          enableSorting: false,
        }),

        columnHelper.accessor('systemContextTypeId', {
          cell: () => 'Asset Management',
          header: 'System Context',
          enableSorting: true,
        }),

        columnHelper.accessor('logMessageId', {
          cell: (info) => info.getValue(),
          header: 'User ID',
          enableSorting: true,
        }),

        columnHelper.accessor('guid', {
          cell: () => 'John Doe',
          header: 'User',
          enableSorting: true,
        }),

        columnHelper.accessor('createdDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY hh:mma'),
          header: 'Timestamp',
          enableSorting: false,
        }),

        columnHelper.accessor('guid', {
          cell: () => <PopoverAction />,
          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  return (
    <Flex width="full">
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleSelectRow={handleSelectRow}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        showFooter={showFooter}
        emptyText={emptyText}
        emptyLines={emptyLines}
        isSelectable={isSelectable}
        selectMultipleRows={selectMultipleRows}
        disabledRows={disabledRows}
        showEmptyState={showEmptyState}
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
    </Flex>
  );
};

export default LogTable;
