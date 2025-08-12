import { Flex, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { AssetComplianceCategory } from '~/lib/interfaces/asset/compliance.interfaces';
import PopoverAction from './PopoverAction';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';

interface FacilityComplianceTableProps extends GenericTableProps {
  data: AssetComplianceCategory[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: AssetComplianceCategory) => void;
}

const FacilityComplianceTable = (props: FacilityComplianceTableProps) => {
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

  const columnHelper = createColumnHelper<AssetComplianceCategory>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('categoryName', {
          cell: (info) => info.getValue(),
          header: 'Asset Category',
          enableSorting: false,
        }),
        columnHelper.accessor('totalAssets', {
          cell: (info) => info.getValue(),
          header: 'Total Assets',
          enableSorting: false,
        }),
        columnHelper.accessor('compliant', {
          cell: (info) => info.getValue(),
          header: 'Complaint',
          enableSorting: false,
        }),
        columnHelper.accessor('nonCompliant', {
          cell: (info) => info.getValue(),
          header: 'Non compliant',
          enableSorting: false,
        }),
        columnHelper.accessor('categoryId', {
          cell: (info) => <PopoverAction assetCategoryId={info.getValue()} />,
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
        columnHelper.accessor('categoryName', {
          cell: (info) => info.getValue(),
          header: 'Asset Category',
          enableSorting: false,
        }),
        columnHelper.accessor('totalAssets', {
          cell: (info) => info.getValue(),
          header: 'Total Assets',
          enableSorting: false,
        }),
        columnHelper.accessor('compliant', {
          cell: (info) => info.getValue(),
          header: 'Complaint',
          enableSorting: false,
        }),
        columnHelper.accessor('nonCompliant', {
          cell: (info) => info.getValue(),
          header: 'Non compliant',
          enableSorting: false,
        }),
        columnHelper.accessor('complianceStatus', {
          cell: (info) => {
            return (
              <GenericStatusBox
                text={info.getValue()}
                colorCode={info.row.original.displayColorCode}
              />
            );
          },
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('categoryId', {
          cell: (info) => <PopoverAction assetCategoryId={info.getValue()} />,
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

export default FacilityComplianceTable;
