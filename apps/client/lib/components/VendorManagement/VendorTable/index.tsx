import { Flex, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { Vendor } from '~/lib/interfaces/vendor.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import UserInfo from '../../Common/UserInfo';
import GenericStatusBox from '../../UI/GenericStatusBox';
import PopoverAction from './PopoverAction';

const ContactPerson = (vendor: Vendor) => {
  const { emailAddress, phoneNumber, contactFirstName, contactLastName } =
    vendor;
  return (
    <VStack alignItems="flex-start" spacing="2px">
      <Text color="black">
        {contactFirstName ?? ''} {contactLastName ?? ''}
      </Text>
      <Text size="sm" color="neutral.600">
        {emailAddress}
      </Text>
      <Text size="sm" color="neutral.600">
        {phoneNumber}
      </Text>
    </VStack>
  );
};
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
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('vendorId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),

        columnHelper.accessor('vendorName', {
          cell: (info) => UserInfo({ name: info.getValue() }),
          header: 'Vendor Name',
          enableSorting: true,
        }),
        columnHelper.accessor('vendorName', {
          cell: (info) => ContactPerson(info.row.original),
          header: 'Contact Person',
          enableSorting: false,
        }),
        columnHelper.accessor('emailAddress', {
          cell: () => 'Maintenance',
          header: 'Category',
          enableSorting: true,
        }),

        columnHelper.accessor('createdDate', {
          cell: (info) => dateFormatter(info.getValue(), 'DD / MM / YYYY'),
          header: 'Contract Expiry Date',
          enableSorting: false,
        }),

        columnHelper.accessor('lastModifiedBy', {
          cell: () => <GenericStatusBox text="Active" colorCode="#07CC3B" />,
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('guid', {
          cell: (info) => <PopoverAction vendor={info.row.original} />,
          header: '',
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
        columnHelper.accessor('vendorId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),

        columnHelper.accessor('vendorName', {
          cell: (info) => UserInfo({ name: info.getValue() }),
          header: 'Vendor Name',
          enableSorting: true,
        }),

        columnHelper.accessor('lastModifiedBy', {
          cell: () => <GenericStatusBox text="Active" colorCode="#07CC3B" />,
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('guid', {
          cell: (info) => <PopoverAction vendor={info.row.original} />,
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

export default VendorTable;
