import { Flex, Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { AuditLog } from '~/lib/interfaces/log.interfaces';
import UserInfo from '../../Common/UserInfo';
import GenericStatusBox from '../../UI/GenericStatusBox';

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
        columnHelper.accessor('createdDate', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-DD-MM hh:mmA'),
          header: 'Timestamp',
          enableSorting: false,
        }),

        columnHelper.accessor('logMessage', {
          cell: () => <UserInfo name="Courtney Henry" role="Admin Manager" />,
          header: 'User',
          enableSorting: false,
        }),
        columnHelper.accessor('systemContextTypeId', {
          cell: () => 'Asset Created',
          header: 'Action',
          enableSorting: true,
        }),

        columnHelper.accessor('systemContextTypeId', {
          cell: () => 'Asset Management',
          header: 'Module Affected',
          enableSorting: true,
        }),

        columnHelper.accessor('logMessageId', {
          cell: () => (
            <VStack spacing={0} alignItems="flex-start">
              <Text color="black">Macbook 2015</Text>
              <Text color="neutral.700" size="xs">
                Google Chrome
              </Text>
            </VStack>
          ),
          header: 'Device/Browser',
          enableSorting: true,
        }),

        columnHelper.accessor('guid', {
          cell: () => 'Created',
          header: 'Change Type',
          enableSorting: true,
        }),

        columnHelper.accessor('isDeleted', {
          cell: () => '198.62.10.0',
          header: 'IP Address',
          enableSorting: true,
        }),

        columnHelper.accessor('isNew', {
          cell: () => <GenericStatusBox text="Active" colorCode="#07CC3B" />,
          header: 'Status',
          enableSorting: true,
        }),

        columnHelper.accessor('guid', {
          cell: (info) => <PopoverAction log={info.row.original} />,
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
