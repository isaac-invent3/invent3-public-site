import React, { useMemo } from 'react';
import InfoCard from '../../../InfoCard';
import { Flex } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { DataTable } from '@repo/ui/components';

const MaintenancePriorityList = () => {
  const columnHelper = createColumnHelper<Asset>();
  const columns = useMemo(() => {
    const baseColumns = [
      columnHelper.accessor('assetId', {
        cell: (info) => info.getValue(),
        header: 'Asset ID',
        enableSorting: false,
      }),
      columnHelper.accessor('assetName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Asset',
        enableSorting: false,
      }),
      columnHelper.accessor('assetCategory', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Zone',
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
    return baseColumns;
  }, []);
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
        data={[]}
        emptyLines={3}
        isLoading={false}
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

export default MaintenancePriorityList;
