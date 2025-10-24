import React, { useMemo } from 'react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import { AnnualCostBreakdown } from '~/lib/interfaces/asset/lifeCycle.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';

const CostBreakdownTable = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const columnHelper = createColumnHelper<AnnualCostBreakdown>();
  const data = useAppSelector((state) => state.asset.simulationData);

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('year', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Year',
          enableSorting: false,
        }),
        // columnHelper.accessor('totalLifeCycleCost', {
        //   cell: (info) =>
        //     info.getValue() ? amountFormatter(info.getValue()) : 'N/A',
        //   header: 'Cost',
        //   enableSorting: false,
        // }),
        columnHelper.accessor('maintenanceCost', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()!) : 'N/A',
          header: 'Maintenance',
          enableSorting: false,
        }),
        columnHelper.accessor('depreciationLoss', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()!) : 'N/A',
          header: 'Depreciation',
          enableSorting: false,
        }),
        columnHelper.accessor('residualValue', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()!) : 'N/A',
          header: 'Residual',
          enableSorting: false,
        }),
        columnHelper.accessor('risk', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Risk',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [data?.annualCostBreakdowns] //eslint-disable-line
  );

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('year', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Year',
          enableSorting: false,
        }),
        // columnHelper.accessor('totalLifeCycleCost', {
        //   cell: (info) =>
        //     info.getValue() ? amountFormatter(info.getValue()) : 'N/A',
        //   header: 'Cost',
        //   enableSorting: false,
        // }),
        columnHelper.accessor('maintenanceCost', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()!) : 'N/A',
          header: 'Maintenance',
          enableSorting: false,
        }),
        columnHelper.accessor('risk', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Risk',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [data?.annualCostBreakdowns] //eslint-disable-line
  );
  return (
    <VStack width="full" alignItems="flex-start" spacing={2}>
      <Text color="#42403D" size="md">
        Annual Cost Breakdown
      </Text>
      <DataTable
        columns={isMobile ? mobileColumns : columns}
        data={data?.annualCostBreakdowns ?? []}
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
    </VStack>
  );
};

export default CostBreakdownTable;
