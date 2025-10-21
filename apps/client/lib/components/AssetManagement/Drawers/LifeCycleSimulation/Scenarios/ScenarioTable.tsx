import React, { useMemo } from 'react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMediaQuery } from '@chakra-ui/react';
import { useGetAllAssetQuery } from '~/lib/redux/services/asset/general.services';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

const ScenarioTable = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const columnHelper = createColumnHelper<Asset>();
  const { data, isLoading, isFetching } = useGetAllAssetQuery({ pageSize: 5 });

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => 'Base',
          header: 'Scenario',
          enableSorting: false,
        }),
        columnHelper.accessor('acquisitionDate', {
          cell: (info) =>
            info.getValue() ? dateFormatter(info.getValue(), 'YYYY') : 'N/A',
          header: 'Replacement Year',
          enableSorting: false,
        }),
        columnHelper.accessor('totalLifeCycleCost', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()) : 'N/A',
          header: 'Total Cost',
          enableSorting: false,
        }),
        columnHelper.accessor('maintenanceCost', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()!) : 'N/A',
          header: 'Maintenance Cost',
          enableSorting: false,
        }),
        columnHelper.accessor('disposalCost', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()!) : 'N/A',
          header: 'Depreciation Loss',
          enableSorting: false,
        }),
        columnHelper.accessor('currentCost', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()!) : 'N/A',
          header: 'Residual Value',
          enableSorting: false,
        }),
        columnHelper.accessor('riskScoreName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Risk Score',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => 'Base',
          header: 'Scenario',
          enableSorting: false,
        }),
        columnHelper.accessor('acquisitionDate', {
          cell: (info) =>
            info.getValue() ? dateFormatter(info.getValue(), 'YYYY') : 'N/A',
          header: 'Replacement Year',
          enableSorting: false,
        }),
        columnHelper.accessor('totalLifeCycleCost', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()) : 'N/A',
          header: 'Total Cost',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );
  return (
    <DataTable
      columns={isMobile ? mobileColumns : columns}
      data={data?.data?.items ?? []}
      isLoading={isLoading}
      isFetching={isFetching}
      showFooter={false}
      maxTdWidth="200px"
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
  );
};

export default ScenarioTable;
