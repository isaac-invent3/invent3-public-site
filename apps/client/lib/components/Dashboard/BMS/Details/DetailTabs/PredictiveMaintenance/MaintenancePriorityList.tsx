import React, { useMemo } from 'react';
import InfoCard from '../../../InfoCard';
import { createColumnHelper } from '@tanstack/react-table';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { DataTable } from '@repo/ui/components';
import { MaintenancePriorityList } from '~/lib/interfaces/dashboard/bms.interfaces';
import { useGetBMSMaintenancePriorityListQuery } from '~/lib/redux/services/dashboard/bms.services';
import { useParams } from 'next/navigation';

const MaintenancePriority = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSMaintenancePriorityListQuery(
    { facilityId: id },
    { skip: !id }
  );
  const columnHelper = createColumnHelper<MaintenancePriorityList>();
  const columns = useMemo(() => {
    const baseColumns = [
      columnHelper.accessor('assetId', {
        cell: (info) => info.getValue(),
        header: 'Asset ID',
        enableSorting: false,
      }),
      columnHelper.accessor('asset', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Asset',
        enableSorting: false,
      }),
      columnHelper.accessor('zone', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Zone',
        enableSorting: false,
      }),

      columnHelper.accessor('status', {
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
    return baseColumns;
  }, [data]);
  return (
    <InfoCard
      title="Maintenance Priority List"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
    >
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        emptyLines={3}
        isLoading={isLoading}
        totalPages={10}
        showFooter={false}
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
    </InfoCard>
  );
};

export default MaintenancePriority;
