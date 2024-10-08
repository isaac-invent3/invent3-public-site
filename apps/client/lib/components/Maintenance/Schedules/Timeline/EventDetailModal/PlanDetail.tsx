import { VStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import DataTable from '~/lib/components/UI/Table';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

interface PlanDetailProps {
  data: MaintenancePlan;
}
const PlanDetail = (props: PlanDetailProps) => {
  const { data } = props;
  const columnHelper = createColumnHelper<MaintenancePlan>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('maintenancePlanId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('maintenanceType', {
        cell: (info) => info.getValue(),
        header: 'Plan Type',
        enableSorting: false,
      }),
      columnHelper.accessor('assetName', {
        cell: (info) => info.getValue(),
        header: 'Frequency',
        enableSorting: false,
      }),
      columnHelper.accessor('assetId', {
        cell: (info) => info.getValue(),
        header: 'Asset ID',
        enableSorting: false,
      }),
      columnHelper.accessor('contactPerson', {
        cell: (info) => info.getValue(),
        header: 'Owner ID',
        enableSorting: false,
      }),
      columnHelper.accessor('totalCost', {
        cell: (info) => amountFormatter(info.getValue() ?? 0),
        header: 'Cost',
        enableSorting: false,
      }),
      columnHelper.accessor('scheduledDate', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return dateFormatter(value, 'DD / MM / YYYY');
          } else {
            return 'N/A';
          }
        },
        header: 'Created',
        enableSorting: false,
      }),
    ],
    [[data]] //eslint-disable-line
  );

  return (
    <VStack width="full" alignItems="flex-start" spacing="4px">
      <DetailHeader
        variant="secondary"
        customStyles={{ color: 'black', size: 'base', fontWeight: 500 }}
      >
        Maintenance Plan Detail
      </DetailHeader>
      <DataTable
        columns={columns}
        data={[data] ?? []}
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
        customTBodyRowStyle={{ verticalAlign: 'top' }}
        customTableContainerStyle={{ rounded: 'none' }}
        showFooter={false}
      />
    </VStack>
  );
};

export default PlanDetail;
