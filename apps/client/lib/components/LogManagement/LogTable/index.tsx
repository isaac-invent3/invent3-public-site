import { Flex, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { AuditRecord } from '~/lib/interfaces/log.interfaces';
import UserInfo from '../../Common/UserInfo';
import GenericStatusBox from '../../UI/GenericStatusBox';

interface LogTableProps extends GenericTableProps {
  data: AuditRecord[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: AuditRecord) => void;
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

  const columnHelper = createColumnHelper<AuditRecord>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('auditRecordId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-DD-MM hh:mmA'),
          header: 'Timestamp',
          enableSorting: false,
        }),
        columnHelper.accessor('requestActionTypeName', {
          cell: (info) => info.getValue(),
          header: 'Action',
          enableSorting: true,
        }),
        columnHelper.accessor('systemContextTypeName', {
          cell: (info) => info.getValue(),
          header: 'Module Affected',
          enableSorting: true,
        }),
        columnHelper.accessor('contextIds', {
          cell: (info) => <PopoverAction log={info.row.original} />,
          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('auditRecordId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-DD-MM hh:mmA'),
          header: 'Timestamp',
          enableSorting: false,
        }),

        columnHelper.accessor('username', {
          cell: (info) => <UserInfo name={info.getValue()} />,
          header: 'User',
          enableSorting: false,
        }),
        columnHelper.accessor('requestActionTypeName', {
          cell: (info) => info.getValue(),
          header: 'Action',
          enableSorting: true,
        }),

        columnHelper.accessor('systemContextTypeName', {
          cell: (info) => info.getValue(),
          header: 'Module Affected',
          enableSorting: true,
        }),

        // columnHelper.accessor('logMessageId', {
        //   cell: () => (
        //     <VStack spacing={0} alignItems="flex-start">
        //       <Text color="black">Macbook 2015</Text>
        //       <Text color="neutral.700" size="xs">
        //         Google Chrome
        //       </Text>
        //     </VStack>
        //   ),
        //   header: 'Device/Browser',
        //   enableSorting: true,
        // }),

        columnHelper.accessor('requestActionTypeName', {
          cell: (info) => info.getValue(),
          header: 'Change Type',
          enableSorting: true,
        }),

        // columnHelper.accessor('isDeleted', {
        //   cell: () => '198.62.10.0',
        //   header: 'IP Address',
        //   enableSorting: true,
        // }),

        columnHelper.accessor('statusName', {
          cell: (info) => (
            <GenericStatusBox
              text={info.row.original.statusName}
              colorCode={info.row.original.statusName}
            />
          ),
          header: 'Status',
          enableSorting: true,
        }),

        columnHelper.accessor('systemContextTypeId', {
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
        columns={isMobile ? mobileColumns : columns}
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
      />
    </Flex>
  );
};

export default LogTable;
