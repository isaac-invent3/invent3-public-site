import { Flex } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { Vendor } from '~/lib/interfaces/vendor.interfaces';

interface VendorTableProps extends GenericTableProps {
  data: Vendor[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: Vendor) => void;
}

const VendorTable = (props: VendorTableProps) => {
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

  const columnHelper = createColumnHelper<Vendor>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('vendorId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),

        columnHelper.accessor('vendorName', {
          cell: (info) => info.getValue(),
          header: 'Vendor Name',
          enableSorting: false,
        }),

        columnHelper.accessor('emailAddress', {
          cell: (info) => info.getValue(),
          header: 'Email Address',
          enableSorting: true,
        }),

        columnHelper.accessor('phoneNumber', {
          cell: (info) => info.getValue(),
          header: 'Phone Number',
          enableSorting: false,
        }),
        columnHelper.accessor('address', {
          cell: (info) => info.getValue(),
          header: 'Address',
          enableSorting: false,
        }),

        columnHelper.accessor('createdDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY hh:mma'),
          header: 'Date Requested',
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

export default VendorTable;
