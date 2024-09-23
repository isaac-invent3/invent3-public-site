import { Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { Asset, AssetStatusType } from '~/lib/interfaces/asset.interfaces';
import DataTable from '../UI/Table';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import AssetDetail from './AssetDetail';
import AssetStatus from './AssetStatus';
import { ThreeVerticalDotsIcon } from '../CustomIcons';

const AssetName = (name: string | null) => {
  return (
    <Text fontWeight={700} textDecoration="underline">
      {name}
    </Text>
  );
};

const Status = (status: AssetStatusType) => {
  return (
    <Flex
      width="full"
      justifyContent="flex-start"
      gap="14px"
      alignItems="center"
    >
      <AssetStatus status={status} />
    </Flex>
  );
};

const Dots = () => {
  return <Icon as={ThreeVerticalDotsIcon} boxSize="14px" color="neutral.700" />;
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
        cell: (info) => info.getValue() ?? 'N/A',
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('assetName', {
        cell: (info) => AssetName(info.getValue()),
        header: 'Asset Name',
        enableSorting: false,
      }),
      columnHelper.accessor('assetCode', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Asset Code',
        enableSorting: false,
      }),
      columnHelper.accessor('assetCategory', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Category',
      }),
      columnHelper.accessor('assetSubCategory', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Subcategory',
      }),
      columnHelper.accessor('currentStatus', {
        cell: (info) => Status(info.getValue()),
        header: 'Status',
      }),
      columnHelper.accessor('brandName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Brand Name',
      }),
      columnHelper.accessor('modelRef', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Model Reference',
      }),
      columnHelper.accessor('currentOwner', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Owner',
        enableSorting: false,
      }),
      columnHelper.accessor('assignedTo', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Assigned To',
        enableSorting: false,
      }),
      columnHelper.accessor('responsibleFor', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Responsible For',
        enableSorting: false,
      }),
      columnHelper.accessor('facilityName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Facility',
        enableSorting: false,
      }),
      columnHelper.accessor('buildingName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Building',
        enableSorting: false,
      }),
      columnHelper.accessor('floorName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Floor',
        enableSorting: false,
      }),
      columnHelper.accessor('departmentName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Department',
        enableSorting: false,
      }),
      columnHelper.accessor('roomName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Room',
        enableSorting: false,
      }),
      columnHelper.accessor('aisleName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Aisle',
        enableSorting: false,
      }),
      columnHelper.accessor('shelfName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Shelf',
        enableSorting: false,
      }),
      columnHelper.accessor('acquisitionDate', {
        cell: (info) =>
          info.getValue() ? dateFormatter(info.getValue() as string) : 'N/A',
        header: 'Acquisition Date',
      }),
      columnHelper.accessor('purchaseDate', {
        cell: (info) =>
          info.getValue() ? dateFormatter(info.getValue() as string) : 'N/A',
        header: 'Purchase Date',
      }),
      columnHelper.accessor('initialValue', {
        cell: (info) =>
          info.getValue() ? amountFormatter(info.getValue() as number) : 'N/A',
        header: 'Initial Value',
      }),
      columnHelper.accessor('resalevalue', {
        cell: (info) =>
          info.getValue() ? amountFormatter(info.getValue() as number) : 'N/A',
        header: 'Resale Value',
      }),
      columnHelper.accessor('scrapvalue', {
        cell: (info) =>
          info.getValue() ? amountFormatter(info.getValue() as number) : 'N/A',
        header: 'Scrap Value',
      }),
      columnHelper.accessor('currentCost', {
        cell: (info) =>
          info.getValue() ? amountFormatter(info.getValue() as number) : 'N/A',
        header: 'Current Cost',
      }),
      columnHelper.accessor('maintenanceCost', {
        cell: (info) =>
          info.getValue() ? amountFormatter(info.getValue() as number) : 'N/A',
        header: 'Maintenance Cost',
      }),
      columnHelper.accessor('lifeExpectancy', {
        cell: (info) =>
          info.getValue()
            ? `${info.getValue()} year${(info.getValue() as number) > 1 ? 's' : ''}`
            : 'N/A',
        header: 'Life Expectancy',
      }),
      columnHelper.accessor('lastMaintenanceDate', {
        cell: (info) =>
          info.getValue() ? dateFormatter(info.getValue() as string) : 'N/A',
        header: 'Last Maintenance',
      }),
      columnHelper.accessor('nextMaintenanceDate', {
        cell: (info) =>
          info.getValue() ? dateFormatter(info.getValue() as string) : 'N/A',
        header: 'Next Maintenance',
      }),
      columnHelper.accessor('weightKg', {
        cell: (info) => (info.getValue() ? `${info.getValue()}kg` : 'N/A'),
        header: 'Weight',
      }),
      columnHelper.accessor('lengthCm', {
        cell: (info) => (info.getValue() ? `${info.getValue()}cm` : 'N/A'),
        header: 'Length',
      }),
      columnHelper.accessor('widthCm', {
        cell: (info) => (info.getValue() ? `${info.getValue()}cm` : 'N/A'),
        header: 'Width',
      }),
      columnHelper.accessor('heightCm', {
        cell: (info) => (info.getValue() ? `${info.getValue()}cm` : 'N/A'),
        header: 'Height',
      }),
      columnHelper.accessor('dateCreated', {
        cell: (info) =>
          info.getValue() ? dateFormatter(info.getValue() as string) : 'N/A',
        header: 'Date Created',
      }),

      columnHelper.accessor('currentStatus', {
        cell: () => Dots(),
        header: '',
        enableSorting: false,
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
