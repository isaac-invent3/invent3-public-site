import { VStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { DataTable } from '@repo/ui/components';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

interface PlanDetailProps {
  data: MaintenanceScheduleInstance;
}
const PlanDetail = (props: PlanDetailProps) => {
  const { data } = props;
  const columnHelper = createColumnHelper<MaintenanceScheduleInstance>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('maintenancePlanId', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('planName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Plan Name',
        enableSorting: false,
      }),
      columnHelper.accessor('contactPerson', {
        cell: (info) => info.getValue(),
        header: 'Owner',
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
        data={[data]}
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
        showFooter={false}
      />
    </VStack>
  );
};

export default PlanDetail;
