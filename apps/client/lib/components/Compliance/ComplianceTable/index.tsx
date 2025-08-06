import { Flex, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import PopoverAction from './PopoverAction';
import { FacilityAssetCompliance } from '~/lib/interfaces/asset/compliance.interfaces';
import GenericStatusBox from '../../UI/GenericStatusBox';

interface ComplianceTableProps extends GenericTableProps {
  data: FacilityAssetCompliance[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: FacilityAssetCompliance) => void;
}

const ComplianceTable = (props: ComplianceTableProps) => {
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

  const columnHelper = createColumnHelper<FacilityAssetCompliance>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('facilityName', {
          cell: (info) => info.getValue(),
          header: 'Facility/Location',
          enableSorting: false,
        }),
        columnHelper.accessor('address', {
          cell: (info) => info.getValue(),
          header: 'Address',
          enableSorting: false,
        }),
        columnHelper.accessor('totalAssetCategory', {
          cell: (info) => info.getValue(),
          header: 'Total Asset Category',
          enableSorting: false,
        }),
        columnHelper.accessor('facilityId', {
          cell: (info) => <PopoverAction facilityId={info.getValue()} />,
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
        columnHelper.accessor('facilityName', {
          cell: (info) => info.getValue(),
          header: 'Facility/Location',
          enableSorting: false,
        }),
        columnHelper.accessor('address', {
          cell: (info) => info.getValue(),
          header: 'Address',
          enableSorting: false,
        }),
        columnHelper.accessor('totalAssetCategory', {
          cell: (info) => info.getValue(),
          header: 'Total Asset Category',
          enableSorting: false,
        }),

        columnHelper.accessor('compliant', {
          cell: (info) => info.getValue(),
          header: 'Compliant',
          enableSorting: false,
        }),
        columnHelper.accessor('nonCompliant', {
          cell: (info) => info.getValue(),
          header: 'Non Compliant',
          enableSorting: false,
        }),
        columnHelper.accessor('complianceStatus', {
          cell: (info) => {
            return <GenericStatusBox text={info.getValue()} />;
          },
          header: 'Compliance Status',
          enableSorting: false,
        }),
        columnHelper.accessor('facilityId', {
          cell: (info) => <PopoverAction facilityId={info.getValue()} />,
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
