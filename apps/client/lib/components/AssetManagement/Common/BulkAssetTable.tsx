import { HStack } from '@chakra-ui/react';
import { DataTable, FormSectionInfo } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { useGetAssetsByListOfIdsQuery } from '~/lib/redux/services/asset/general.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import GenericStatusBox from '../../UI/GenericStatusBox';
import { getSelectedAssetIds } from './utils';

interface BulkAssetTableProps {
  type: 'transfer' | 'dispose';
}
const BulkAssetTable = (props: BulkAssetTableProps) => {
  const { type } = props;

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAssetsByListOfIdsQuery({
    pageSize,
    pageNumber,
    assetIds: getSelectedAssetIds(),
  });

  const suffix = type === 'transfer' ? 'transferred' : 'disposed';
  const columnHelper = createColumnHelper<Asset>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('currentOwner', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Current Owner',
          enableSorting: false,
        }),
        columnHelper.accessor('departmentName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Department',
          enableSorting: false,
        }),
        columnHelper.accessor('assetLocation', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Location',
          enableSorting: false,
        }),
        columnHelper.accessor('assetId', {
          cell: (info) => info.getValue(),
          header: 'Asset ID',
          enableSorting: false,
        }),
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue() ?? 'N/A',
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
          enableSorting: false,
        }),
      ];
      const transferColumns = [
        columnHelper.accessor('currentCondition', {
          cell: (info) => info.getValue(),
          header: 'Condition',
          enableSorting: false,
        }),
        columnHelper.accessor('lastMaintenanceDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Last Maintenance Date',
          enableSorting: false,
        }),
      ];

      const disposeColumns = [
        columnHelper.accessor('initialValue', {
          cell: (info) =>
            info.getValue()
              ? amountFormatter(info.getValue() as number)
              : 'N/A',
          header: 'Purchase Value',
          enableSorting: false,
        }),
        columnHelper.accessor('scrapvalue', {
          cell: (info) =>
            info.getValue()
              ? amountFormatter(info.getValue() as number)
              : 'N/A',
          header: 'Current Estimated Value',
          enableSorting: false,
        }),
        columnHelper.accessor('scrapvalue', {
          cell: (info) => (info.getValue() ? `${info.getValue()}%` : 'N/A'),
          header: 'Depreciation %',
          enableSorting: false,
        }),
      ];
      if (type === 'transfer') {
        baseColumns.splice(6, 0, ...transferColumns);
      } else {
        baseColumns.splice(6, 0, ...disposeColumns);
      }
      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  return (
    <HStack width="full" alignItems="flex-start" spacing="16px">
      <FormSectionInfo
        title="Bulk Assets"
        info={`List of assets to be ${suffix}`}
        isRequired={false}
        maxWidth="118px"
      />
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        emptyLines={3}
        isLoading={isLoading}
        isFetching={isFetching}
        selectMultipleRows={true}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={data?.data?.totalPages}
        showFooter={data?.data ? data?.data?.totalPages > 1 : false}
        maxTdWidth="250px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '17px',
          paddingBottom: '17px',
          fontWeight: 700,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '16px',
          paddingBottom: '16px',
        }}
        customTBodyRowStyle={{ verticalAlign: 'top' }}
      />
    </HStack>
  );
};

export default BulkAssetTable;
