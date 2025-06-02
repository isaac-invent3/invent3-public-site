import { Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { AssetBasedCompliance } from '~/lib/interfaces/asset/compliance.interfaces';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';

interface CategoryComplianceTableProps extends GenericTableProps {
  data: AssetBasedCompliance[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: AssetBasedCompliance) => void;
}

const CategoryComplianceTable = (props: CategoryComplianceTableProps) => {
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

  const columnHelper = createColumnHelper<AssetBasedCompliance>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetId', {
          cell: (info) => info.getValue(),
          header: 'Asset ID',
          enableSorting: false,
        }),
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('floor', {
          cell: (info) => `${info.getValue()}/${info.row.original.zone}`,
          header: 'Location (Floor/Zone)',
          enableSorting: false,
        }),
        columnHelper.accessor('compliant', {
          cell: (info) =>
            `${info.getValue()}/7 ${info.getValue() + info.row.original.nonCompliant} Compliant`,
          header: 'Compliance Score',
          enableSorting: false,
        }),
        columnHelper.accessor('facilityName', {
          cell: () => (
            <Text fontWeight={700} color="#1270B0">
              View Compliance
            </Text>
          ),
          header: 'Action',
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
        columnHelper.accessor('assetId', {
          cell: (info) => info.getValue(),
          header: 'Asset ID',
          enableSorting: false,
        }),
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('floor', {
          cell: (info) => `${info.getValue()}/${info.row.original.zone}`,
          header: 'Location (Floor/Zone)',
          enableSorting: false,
        }),
        columnHelper.accessor('compliant', {
          cell: (info) =>
            `${info.getValue()}/${info.getValue() + info.row.original.nonCompliant} Compliant`,
          header: 'Compliance Score',
          enableSorting: false,
        }),

        columnHelper.accessor('complianceStatus', {
          cell: (info) => <GenericStatusBox text={info.getValue()} />,
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('facilityName', {
          cell: () => (
            <Text fontWeight={700} color="#1270B0">
              View Compliance
            </Text>
          ),
          header: 'Action',
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

export default CategoryComplianceTable;
