import { Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { Asset, AssetStatusType } from '~/lib/interfaces/asset.interfaces';
import DataTable from '../UI/Table';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import AssetDetail from './AssetDetail';
import AssetStatus from './AssetStatus';
import { ThreeVerticalDotsIcon } from '../CustomIcons';

const AssetName = (name: string) => {
  return (
    <Text fontWeight={700} textDecoration="underline">
      {name}
    </Text>
  );
};

const Status = (status: AssetStatusType) => {
  return (
    <Flex width="full" justifyContent="flex-end" gap="14px" alignItems="center">
      <AssetStatus status={status} />
      <Icon as={ThreeVerticalDotsIcon} boxSize="14px" color="neutral.700" />
    </Flex>
  );
};

interface ListViewProps {
  data: Asset[];
  pageNumber?: number;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  pageSize?: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  totalPages?: number;
  isLoading: boolean;
  isFetching?: boolean;
}
const ListView = (props: ListViewProps) => {
  const {
    data,
    pageNumber,
    setPageNumber,
    totalPages,
    pageSize,
    setPageSize,
    isLoading,
    isFetching = false,
  } = props;
  const columnHelper = createColumnHelper<Asset>();
  // eslint-disable-next-line no-unused-vars
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (selectedAsset) {
      onOpen();
    }
  }, [selectedAsset]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedAsset(null);
    }
  }, [isOpen]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('assetId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('assetName', {
        cell: (info) => AssetName(info.getValue()),
        header: 'Asset Name',
        enableSorting: false,
      }),
      columnHelper.accessor('assetCategory', {
        cell: (info) => info.getValue(),
        header: 'Category',
      }),
      columnHelper.accessor('roomName', {
        cell: (info) => info.getValue(),
        header: 'Location',
        enableSorting: false,
      }),
      columnHelper.accessor('currentOwner', {
        cell: (info) => info.getValue(),
        header: 'Owner',
        enableSorting: false,
      }),
      columnHelper.accessor('dateCreated', {
        cell: (info) => dateFormatter(info.getValue()),
        header: 'Last Maintenance',
      }),
      columnHelper.accessor('initialValue', {
        cell: () => amountFormatter(0),
        header: 'Current Value',
      }),
      columnHelper.accessor('currentStatus', {
        cell: (info) => Status(info.getValue()),
        header: 'Status',
        meta: {
          centerHeader: true,
        },
      }),
    ],
    [data] //eslint-disable-line
  );
  return (
    <Flex width="full" mt="8px">
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
        handleSelectRow={setSelectedAsset}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      {selectedAsset && (
        <AssetDetail data={selectedAsset} onClose={onClose} isOpen={isOpen} />
      )}
    </Flex>
  );
};

export default ListView;
