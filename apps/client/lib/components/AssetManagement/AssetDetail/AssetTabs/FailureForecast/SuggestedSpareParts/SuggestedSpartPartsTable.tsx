import { VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetFailureSparePartsSuggestionsQuery } from '~/lib/redux/services/forecast.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const SuggestedSpartPartsTable = () => {
  const columnHelper = createColumnHelper<Asset>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

  const { data, isLoading, isFetching } =
    useGetFailureSparePartsSuggestionsQuery(
      {
        assetId: assetData?.assetId!,
        pageSize,
        pageNumber,
      },
      { skip: !assetData?.assetId }
    );

  const columns = useMemo(() => {
    const baseColumns = [
      columnHelper.accessor('assetName', {
        cell: (info) => info.getValue(),
        header: 'Part Name',
        enableSorting: false,
      }),
      columnHelper.accessor('assetCode', {
        cell: (info) => info.getValue(),
        header: 'Part Code',
        enableSorting: false,
      }),
      columnHelper.accessor('brandName', {
        cell: (info) => info.getValue(),
        header: 'Supplier',
        enableSorting: false,
      }),
    ];

    return baseColumns;
  }, [data?.data?.items]); //eslint-disable-line

  return (
    <VStack width="full" spacing="0px">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        showFooter={data?.data ? data?.data?.totalPages > 1 : false}
        isLoading={isLoading}
        isFetching={isFetching}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        emptyLines={3}
        maxTdWidth="250px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '17px',
          paddingBottom: '17px',
          fontWeight: 700,
          bgColor: '#B4BFCA80',
          rounded: 'none',
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '16px',
          paddingBottom: '16px',
        }}
        customTBodyRowStyle={{ verticalAlign: 'top' }}
        customTableContainerStyle={{
          rounded: '0px',
        }}
      />
    </VStack>
  );
};

export default SuggestedSpartPartsTable;
