/* eslint-disable no-unused-vars */
import { Flex, VStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import { DetailTable } from '../../DetailTable';
import AssetStatus from '../../../AssetStatus';

const Status = (status: number) => {
  return (
    <Flex>
      <AssetStatus label="In Use" color="#07CC3B" />
    </Flex>
  );
};

interface TableProps {
  type: 'parent' | 'children';
  isLoading: boolean;
  data: Asset[];
}

const Table = (props: TableProps) => {
  const { type, isLoading, data } = props;
  const columnHelper = createColumnHelper<Asset>();
  const getColumns = (type: string) => {
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
      columnHelper.accessor('categoryId', {
        cell: (info) => info.getValue(),
        header: 'Category',
      }),
      columnHelper.accessor('createdDate', {
        cell: (info) => dateFormatter(info.getValue()),
        header: 'Last Maintenance',
      }),
      columnHelper.accessor('initialValue', {
        cell: () => amountFormatter(0),
        header: 'Current Value',
      }),
      columnHelper.accessor('statusId', {
        cell: (info) => Status(info.getValue()),
        header: 'Status',
        enableSorting: false,
      }),
    ];

    const parentId = columnHelper.accessor('assetId', {
      cell: (info) => info.getValue(),
      header: 'Parent ID',
    });

    if (type === 'children') {
      baseColumns.splice(3, 0, parentId);
    }

    return baseColumns;
  };

  const columns = useMemo(() => getColumns(type), [data]);
  return (
    <VStack width="full" spacing="24px" alignItems="flex-start">
      <DetailTable columns={columns} data={data ?? []} isLoading={isLoading} />
    </VStack>
  );
};

export default Table;
