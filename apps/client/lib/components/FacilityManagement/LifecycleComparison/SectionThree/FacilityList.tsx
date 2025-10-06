import { Flex, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { amountFormatter } from '~/lib/utils/Formatters';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { useGetAllAssetQuery } from '~/lib/redux/services/asset/general.services';

const FacilityList = () => {
  const columnHelper = createColumnHelper<Asset>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { data, isLoading, isFetching } = useGetAllAssetQuery({ pageSize: 5 });

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Facility Name',
          enableSorting: false,
        }),
        columnHelper.accessor('assetCategory', {
          cell: (info) => info.getValue(),
          header: 'Avg Asset Age (yrs)',
          enableSorting: true,
        }),
        columnHelper.accessor('initialValue', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Avg Lifecycle Cost (yrs)',
          enableSorting: true,
        }),
        columnHelper.accessor('maintenanceCost', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Residual Value %',
          enableSorting: true,
        }),
        columnHelper.accessor('currentCost', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Avg Failures / Yr',
          enableSorting: true,
        }),
        columnHelper.accessor('buildingId', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Avg Risk Score',
          enableSorting: true,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Facility Name',
          enableSorting: false,
        }),
        columnHelper.accessor('assetCategory', {
          cell: (info) => info.getValue(),
          header: 'Avg Asset Age (yrs)',
          enableSorting: true,
        }),
        columnHelper.accessor('assetCode', {
          cell: (info) => info.getValue(),
          header: 'Avg Lifecycle Cost (yrs)',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  return (
    <Flex width="full" minH="310px" height="full" bgColor="white">
      <DataTable
        columns={isMobile ? mobileColumns : columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        showFooter={false}
        emptyLines={5}
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

export default FacilityList;
