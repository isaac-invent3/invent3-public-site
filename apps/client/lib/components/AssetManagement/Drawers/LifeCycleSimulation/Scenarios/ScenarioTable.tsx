import React, { useMemo } from 'react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMediaQuery } from '@chakra-ui/react';
import { amountFormatter } from '~/lib/utils/Formatters';
import { useAppSelector } from '~/lib/redux/hooks';
import { SimulatedScenarion } from '~/lib/interfaces/asset/lifeCycle.interfaces';

const ScenarioTable = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const columnHelper = createColumnHelper<SimulatedScenarion>();
  const data = useAppSelector((state) => state.asset.simulationData);

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('scenario', {
          cell: (info) => info.getValue ?? 'N/A',
          header: 'Scenario',
          enableSorting: false,
        }),
        columnHelper.display({
          cell: (info) => '2022',
          header: 'Replacement Year',
          enableSorting: false,
        }),
        // columnHelper.accessor('totalLifeCycleCost', {
        //   cell: (info) =>
        //     info.getValue() ? amountFormatter(info.getValue()) : 'N/A',
        //   header: 'Total Cost',
        //   enableSorting: false,
        // }),
        columnHelper.accessor('maintenanceCost', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()!) : 'N/A',
          header: 'Maintenance Cost',
          enableSorting: false,
        }),
        columnHelper.accessor('depreciationLoss', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()) : 'N/A',
          header: 'Depreciation Loss',
          enableSorting: false,
        }),
        columnHelper.accessor('residualValue', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()) : 'N/A',
          header: 'Residual Value',
          enableSorting: false,
        }),
        columnHelper.accessor('riskScore', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Risk Score',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [data?.simulatedScenarions] //eslint-disable-line
  );

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('scenario', {
          cell: (info) => info.getValue ?? 'N/A',
          header: 'Scenario',
          enableSorting: false,
        }),
        columnHelper.display({
          cell: (info) => '2022',
          header: 'Replacement Year',
          enableSorting: false,
        }),
        columnHelper.accessor('maintenanceCost', {
          cell: (info) =>
            info.getValue() ? amountFormatter(info.getValue()) : 'N/A',
          header: 'Maintenance Cost',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [data] //eslint-disable-line
  );
  return (
    <DataTable
      columns={isMobile ? mobileColumns : columns}
      data={data?.simulatedScenarions ?? []}
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
