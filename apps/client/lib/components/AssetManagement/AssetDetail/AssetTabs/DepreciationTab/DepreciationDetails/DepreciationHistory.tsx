import { Collapse, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '~/lib/components/CustomIcons';
import { AssetDepreciationHistory } from '~/lib/interfaces/asset/depreciation.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAllAssetDepreciationHistoryByDepreciationIdQuery } from '~/lib/redux/services/asset/depreciation.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

const DepreciationHistory = ({
  depreciationId,
}: {
  depreciationId?: number;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const columnHelper = createColumnHelper<AssetDepreciationHistory>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { data, isLoading, isFetching } =
    useGetAllAssetDepreciationHistoryByDepreciationIdQuery(
      {
        depreciationId: depreciationId!,
        pageSize,
        pageNumber,
      },
      { skip: !depreciationId }
    );

  const columns = useMemo(() => {
    const baseColumns = [
      columnHelper.accessor('createdDate', {
        cell: (info) => dateFormatter(info.getValue(), 'YYYY'),
        header: 'Year',
        enableSorting: false,
      }),
      columnHelper.accessor('initialValue', {
        cell: (info) =>
          info.getValue() ? amountFormatter(info.getValue()) : 'N/A',
        header: 'Opening Value',
        enableSorting: false,
      }),
      columnHelper.accessor('depreciation', {
        cell: (info) => info.getValue(),
        header: 'Depreciation',
        enableSorting: false,
      }),
      columnHelper.accessor('currentValue', {
        cell: (info) =>
          info.getValue() ? amountFormatter(info.getValue()) : 'N/A',
        header: 'Closing Value',
        enableSorting: false,
      }),
    ];

    return baseColumns;
  }, [data?.data?.items]); //eslint-disable-line

  return (
    <VStack width="full" spacing="8px">
      <HStack
        width="full"
        justifyContent="space-between"
        cursor="pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Text size="md" lineHeight="100%" color="blue.500">
          View Depreciation History
        </Text>
        <Icon
          as={isOpen ? ChevronUpIcon : ChevronDownIcon}
          boxSize="16px"
          color="neutral.800"
        />
      </HStack>
      <Collapse
        startingHeight={0}
        in={isOpen}
        transition={{ enter: { duration: 0 } }}
        style={{ width: '100%' }}
      >
        <DataTable
          columns={columns}
          data={data?.data?.items ?? []}
          showFooter={false}
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
            bgColor: '#B4BFCA',
          }}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
          }}
          customTBodyRowStyle={{ verticalAlign: 'top' }}
          customTableContainerStyle={{
            rounded: '4px',
          }}
        />
      </Collapse>
    </VStack>
  );
};

export default DepreciationHistory;
