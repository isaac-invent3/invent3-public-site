import { Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { FailedUploadItems } from '~/lib/interfaces/general.interfaces';
import { useGetDataUploadFailedItemByUploadIdQuery } from '~/lib/redux/services/utility.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const ValidationTwoError = ({
  dataUploadId,
}: {
  dataUploadId: number | undefined;
}) => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } =
    useGetDataUploadFailedItemByUploadIdQuery(
      { id: dataUploadId!, pageSize, pageNumber },
      { skip: !dataUploadId }
    );
  const columnHelper = createColumnHelper<FailedUploadItems>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('tabName', {
        cell: (info) => info.getValue(),
        header: 'Tab',
        enableSorting: false,
      }),
      columnHelper.accessor('cell', {
        cell: (info) => info.getValue(),
        header: 'Cell',
        enableSorting: false,
      }),
      columnHelper.accessor('reason', {
        cell: (info) => info.getValue(),
        header: 'Error Code',
        enableSorting: false,
      }),
      columnHelper.accessor('dataUploadFailedItemId', {
        cell: (info) => info.getValue(),
        header: 'Action',
        enableSorting: false,
      }),
    ],
    [data?.data?.items] //eslint-disable-line
  );

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <Text size="md" fontWeight={700}>
        <Text as="span" color="error.500" size="md" fontWeight={700}>
          {isLoading ? '-' : (data?.data?.totalItems ?? 0)} {''}
        </Text>
        items failed - Validating Template Phase 2
      </Text>
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        showFooter={data?.data ? data?.data?.totalPages > 1 : false}
        emptyLines={3}
        isLoading={isLoading}
        isFetching={isFetching}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        pageSize={pageSize}
        maxTdWidth="250px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '17px',
          paddingBottom: '17px',
          fontWeight: 700,
          bgColor: '#B4BFCA',
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '16px',
          paddingBottom: '16px',
        }}
        customTBodyRowStyle={{ verticalAlign: 'top' }}
        customTableContainerStyle={{ rounded: '4px' }}
      />
    </VStack>
  );
};

export default ValidationTwoError;
