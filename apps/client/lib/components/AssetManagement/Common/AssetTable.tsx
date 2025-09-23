import React, { useMemo } from 'react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import {
  Box,
  HStack,
  Icon,
  Text,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';
import { InfoIcon, ThreeVerticalDotsIcon } from '../../CustomIcons';
import GenericStatusBox from '../../UI/GenericStatusBox';

const AssetName = (asset: Asset) => {
  return (
    <HStack spacing="8px">
      <Box
        width="8px"
        height="8px"
        rounded="full"
        bgColor={asset?.assetHealthColorCode}
      />
      <Text fontWeight={700} textDecoration="underline">
        {asset?.assetName}
      </Text>
    </HStack>
  );
};

const AssetHeader = () => (
  <HStack spacing="8px">
    <Text fontWeight={700}>Asset Name</Text>
    <Tooltip
      label="The colour indicator represents the health of the asset"
      placement="top-start"
      bgColor="black"
      color="white"
      width="181px"
      rounded="4px"
      py="3px"
      px="6px"
      fontSize="10px"
      fontWeight={400}
      hasArrow
    >
      <Icon as={InfoIcon} boxSize="12px" color="blue.500" />
    </Tooltip>
  </HStack>
);

const Dots = () => {
  return <Icon as={ThreeVerticalDotsIcon} boxSize="14px" color="neutral.700" />;
};

interface AssetTableProps {
  data: Asset[];
  isLoading?: boolean;
  isFetching?: boolean;
  emptyText?: string;
  showFooter?: boolean;
  emptyLines?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  selectedRows?: number[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: Asset) => void;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  isSelectable?: boolean;
  isSortable?: boolean;
  showPopover?: boolean;
  // eslint-disable-next-line no-unused-vars
  PopoverComponent?: (data: Asset) => JSX.Element | undefined;
}
const AssetTable = (props: AssetTableProps) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const columnHelper = createColumnHelper<Asset>();
  const {
    data,
    isFetching,
    isLoading,
    isSelectable,
    pageNumber,
    pageSize,
    showFooter,
    emptyText,
    emptyLines,
    totalPages,
    selectedRows,
    isSortable = true,
    showPopover = true,
    handleSelectRow,
    setPageNumber,
    setPageSize,
    setSelectedRows,
    PopoverComponent,
  } = props;

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetId', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('assetName', {
          cell: (info) => AssetName(info.row.original),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('assetCategory', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Category',
          enableSorting: false,
        }),
        columnHelper.accessor('currentStatus', {
          cell: (info) => {
            return (
              <GenericStatusBox
                text={info.getValue()}
                colorCode={info.row.original.displayColorCode}
              />
            );
          },
          header: 'Status',
          enableSorting: isSortable,
        }),
      ];
      const popOverColumn = columnHelper.accessor('rowId', {
        cell: (info) => {
          if (PopoverComponent) {
            return PopoverComponent(info.row.original);
          }
          return <Dots />;
        },
        header: '',
        enableSorting: false,
      });

      if (showPopover) {
        baseColumns.push(popOverColumn);
      }
      return baseColumns;
    },
    [data] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetId', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('assetName', {
          cell: (info) => AssetName(info.row.original) ?? 'N/A',
          header: () => <AssetHeader />,
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
          enableSorting: isSortable,
        }),
        columnHelper.accessor('assetSubCategory', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Subcategory',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('riskScoreName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Risk Score',
          enableSorting: false,
        }),
        columnHelper.accessor('currentStatus', {
          cell: (info) => {
            return (
              <GenericStatusBox
                text={info.getValue()}
                colorCode={info.row.original.displayColorCode}
              />
            );
          },
          header: 'Status',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('brandName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Brand Name',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('modelRef', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Model',
          enableSorting: isSortable,
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
        columnHelper.accessor('employeeResponsible', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Responsible For',
          enableSorting: false,
        }),
        columnHelper.accessor('countryName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Country',
          enableSorting: false,
        }),
        columnHelper.accessor('stateName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'State',
          enableSorting: false,
        }),
        columnHelper.accessor('lganame', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'LGA',
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
          enableSorting: isSortable,
        }),
        columnHelper.accessor('purchaseDate', {
          cell: (info) =>
            info.getValue() ? dateFormatter(info.getValue() as string) : 'N/A',
          header: 'Purchase Date',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('initialValue', {
          cell: (info) =>
            info.getValue()
              ? amountFormatter(info.getValue() as number)
              : 'N/A',
          header: 'Initial Value',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('resalevalue', {
          cell: (info) =>
            info.getValue()
              ? amountFormatter(info.getValue() as number)
              : 'N/A',
          header: 'Resale Value',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('scrapvalue', {
          cell: (info) =>
            info.getValue()
              ? amountFormatter(info.getValue() as number)
              : 'N/A',
          header: 'Scrap Value',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('currentCost', {
          cell: (info) =>
            info.getValue()
              ? amountFormatter(info.getValue() as number)
              : 'N/A',
          header: 'Current Cost',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('maintenanceCost', {
          cell: (info) =>
            info.getValue()
              ? amountFormatter(info.getValue() as number)
              : 'N/A',
          header: 'Maintenance Cost',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('lifeExpectancy', {
          cell: (info) =>
            info.getValue()
              ? `${info.getValue()} year${(info.getValue() as number) > 1 ? 's' : ''}`
              : 'N/A',
          header: 'Life Expectancy',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('lastMaintenanceDate', {
          cell: (info) =>
            info.getValue() ? dateFormatter(info.getValue() as string) : 'N/A',
          header: 'Last Maintenance',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('nextMaintenanceDate', {
          cell: (info) =>
            info.getValue() ? dateFormatter(info.getValue() as string) : 'N/A',
          header: 'Next Maintenance',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('weightKg', {
          cell: (info) => (info.getValue() ? `${info.getValue()}kg` : 'N/A'),
          header: 'Weight',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('lengthCm', {
          cell: (info) => (info.getValue() ? `${info.getValue()}cm` : 'N/A'),
          header: 'Length',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('widthCm', {
          cell: (info) => (info.getValue() ? `${info.getValue()}cm` : 'N/A'),
          header: 'Width',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('heightCm', {
          cell: (info) => (info.getValue() ? `${info.getValue()}cm` : 'N/A'),
          header: 'Height',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) =>
            info.getValue() ? dateFormatter(info.getValue() as string) : 'N/A',
          header: 'Date Created',
          enableSorting: isSortable,
        }),
      ];
      const popOverColumn = columnHelper.accessor('rowId', {
        cell: (info) => {
          if (PopoverComponent) {
            return PopoverComponent(info.row.original);
          }
          return <Dots />;
        },
        header: '',
        enableSorting: false,
      });

      if (showPopover) {
        baseColumns.push(popOverColumn);
      }
      return baseColumns;
    },
    [data] //eslint-disable-line
  );
  return (
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
      maxTdWidth="200px"
    />
  );
};

export default AssetTable;
