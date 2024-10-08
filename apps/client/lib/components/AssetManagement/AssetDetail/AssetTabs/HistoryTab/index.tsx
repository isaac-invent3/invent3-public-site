import { Flex, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useGetMaintenanceHistoryByAssetIdQuery } from '~/lib/redux/services/asset/general.services';
import { useAppSelector } from '~/lib/redux/hooks';
import DataTable from '~/lib/components/UI/Table';
import Technician from '../../../Common/Technician';
import Status from '../../../Common/MaintenanceStatus';

const Description = (description: string) => {
  return (
    <Text
      height="full"
      whiteSpace="normal"
      noOfLines={3}
      textOverflow="ellipsis"
      width="full"
      maxW="217px"
    >
      {description}
    </Text>
  );
};

const HistoryTab = () => {
  const { assetId } = useAppSelector((state) => state.asset.asset);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading } = useGetMaintenanceHistoryByAssetIdQuery(
    { id: assetId, pageSize, pageNumber: currentPage },
    { skip: !assetId }
  );
  const columnHelper = createColumnHelper<MaintenancePlan>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('assetId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('completionDate', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return dateFormatter(value, 'YYYY-MM-DD');
          } else {
            return 'N/A';
          }
        },
        header: 'Date',
        enableSorting: false,
      }),
      columnHelper.accessor('maintenanceType', {
        cell: (info) => info.getValue(),
        header: 'Maintenance Type',
        enableSorting: false,
      }),
      columnHelper.accessor('comments', {
        cell: (info) =>
          info.getValue() ? Description(info.getValue()) : 'N/A',
        header: 'Description',
        enableSorting: false,
      }),
      columnHelper.accessor('contactPerson', {
        cell: (info) =>
          !info.row.original.contactPerson &&
          !info.row.original.contactPersonEmail &&
          !info.row.original.contactPersonPhoneNo
            ? 'N/A'
            : Technician(info.row.original),
        header: 'Contact Person',
        enableSorting: false,
      }),
      columnHelper.accessor('totalCost', {
        cell: (info) => amountFormatter(info.getValue() ?? 0),
        header: 'Cost',
        enableSorting: false,
      }),
      columnHelper.accessor('currentStatus', {
        cell: (info) => (info.getValue() ? Status(info.getValue()) : 'N/A'),
        header: 'Status',
        enableSorting: false,
      }),
    ],
    [data?.data?.items] //eslint-disable-line
  );

  return (
    <Flex width="full" my="23px">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        pageSize={pageSize}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        setPageSize={setPageSize}
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '8px',
          paddingBottom: '8px',
          fontWeight: 500,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '16px',
          paddingBottom: '8px',
        }}
        customTBodyRowStyle={{ verticalAlign: 'top' }}
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </Flex>
  );
};

export default HistoryTab;
