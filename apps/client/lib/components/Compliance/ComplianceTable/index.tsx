import { Flex, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import PopoverAction from './PopoverAction';
import { AssetComplaince } from '~/lib/interfaces/asset/compliance.interfaces';

interface LogTableProps extends GenericTableProps {
  data: AssetComplaince[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: AssetComplaince) => void;
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

  const columnHelper = createColumnHelper<AssetComplaince>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('regulationId', {
          cell: (info) => info.getValue(),
          header: 'Regulation ID',
          enableSorting: false,
        }),
        columnHelper.accessor('standard', {
          cell: (info) => info.getValue(),
          header: 'Compliance Standard',
          enableSorting: true,
        }),
        columnHelper.accessor('lastInspectionDate', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-MM-DD'),
          header: 'Last Review Date',
          enableSorting: false,
        }),
        columnHelper.accessor('assetComplianceId', {
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
        columnHelper.accessor('regulationId', {
          cell: (info) => info.getValue(),
          header: 'Regulation ID',
          enableSorting: false,
        }),

        columnHelper.accessor('description', {
          cell: (info) => info.getValue(),
          header: 'Description',
          enableSorting: true,
        }),
        columnHelper.accessor('standard', {
          cell: (info) => info.getValue(),
          header: 'Compliance Standard',
          enableSorting: true,
        }),
        columnHelper.accessor('lastInspectionDate', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-MM-DD'),
          header: 'Last Review Date',
          enableSorting: false,
        }),
        columnHelper.accessor('frequencyId', {
          cell: () => '6 Months',
          header: 'Frequency',
          enableSorting: false,
        }),
        columnHelper.accessor('issuerId', {
          cell: () => 'CertAuthority Ltd',
          header: 'Certificate Issued By',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-MM-DD'),
          header: 'Certificate Issue Date',
          enableSorting: false,
        }),
        columnHelper.accessor('expiryDate', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-MM-DD') ?? 'N/A',
          header: 'Expiry Date',
          enableSorting: false,
        }),
        columnHelper.accessor('assetComplianceId', {
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
