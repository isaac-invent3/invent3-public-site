import { Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { AssetBasedCompliance } from '~/lib/interfaces/asset/compliance.interfaces';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import PopoverAction from './PopoverAction';

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
  const { updateSearchParam } = useCustomSearchParams();

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
          cell: (info) =>
            `${info.getValue() ?? 'N/A'}${info.row.original.zone ? `/${info.row.original.zone}` : ''}`,
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
          cell: (info) => (
            <Text
              fontWeight={700}
              color="#1270B0"
              cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                updateSearchParam(
                  SYSTEM_CONTEXT_DETAILS.COMPLIANCE.slug,
                  info.row.original.assetId
                );
              }}
            >
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
          cell: (info) => (
            <Text
              size="md"
              lineHeight="100%"
              fontWeight={700}
              color="blue.500"
              cursor="pointer"
              textDecoration="underline"
            >
              {info.getValue()}
            </Text>
          ),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('floor', {
          cell: (info) =>
            `${info.getValue() ?? 'N/A'}${info.row.original.zone ? `/${info.row.original.zone}` : ''}`,
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
          cell: (info) => (
            <GenericStatusBox
              text={info.getValue()}
              colorCode={info.row.original.displayColorCode}
            />
          ),
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.display({
          id: 'action',
          cell: (info) => <PopoverAction data={info.row.original} />,
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
          bgColor: 'white',
        }}
      />
    </Flex>
  );
};

export default CategoryComplianceTable;
