import { Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { AuditRecord } from '~/lib/interfaces/log.interfaces';
import PopoverAction from './PopoverAction';

interface LogTableProps extends GenericTableProps {
  data: AuditRecord[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: AuditRecord) => void;
}

const ComplianceTable = (props: LogTableProps) => {
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
          cell: () => <PopoverAction />,
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
          cell: () => 'ISO 27001',
          header: 'Compliance Standard',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: () => <Text color="#07CC3B">Completed</Text>,
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-MM-DD'),
          header: 'Last Review Date',
          enableSorting: false,
        }),

        columnHelper.accessor('username', {
          cell: () => '6 Months',
          header: 'Frequency',
          enableSorting: false,
        }),
        columnHelper.accessor('requestActionTypeName', {
          cell: () => 'CertAuthority Ltd',
          header: 'Certificate Issued By',
          enableSorting: true,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-MM-DD'),
          header: 'Certificate Issued Date',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-MM-DD'),
          header: 'Expiry Date',
          enableSorting: false,
        }),
        columnHelper.accessor('contextIds', {
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

export default ComplianceTable;
