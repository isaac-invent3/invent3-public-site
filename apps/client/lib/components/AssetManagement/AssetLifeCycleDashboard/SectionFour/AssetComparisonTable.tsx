import { Flex, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { amountFormatter } from '~/lib/utils/Formatters';
import { Asset } from '~/lib/interfaces/asset/general.interface';

interface AssetComparisionTableProps extends GenericTableProps {
  data: Asset[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: Asset) => void;
}

const AssetComparisionTable = (props: AssetComparisionTableProps) => {
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

  const columnHelper = createColumnHelper<Asset>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('initialValue', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Acquisition Cost',
          enableSorting: true,
        }),
        columnHelper.accessor('maintenanceCost', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Maintenance Cost',
          enableSorting: true,
        }),
        columnHelper.accessor('currentCost', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Disposal Cost',
          enableSorting: true,
        }),
        columnHelper.accessor('buildingId', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Total Lifecyle',
          enableSorting: true,
        }),
        columnHelper.accessor('assetId', {
          cell: (info) => `${info.getValue()}%`,
          header: 'ROI',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('initialValue', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Acquisition Cost',
          enableSorting: true,
        }),
        columnHelper.accessor('maintenanceCost', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Maintenance Cost',
          enableSorting: true,
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

export default AssetComparisionTable;
