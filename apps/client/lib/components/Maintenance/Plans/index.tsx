import { Flex, Icon } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { ThreeVerticalDotsIcon } from '~/lib/components/CustomIcons';
import DataTable from '~/lib/components/UI/Table';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useGetAllMaintenancePlanQuery } from '~/lib/redux/services/maintenance/plan.services';
import { dateFormatter } from '~/lib/utils/Formatters';

const Dots = () => {
  return <Icon as={ThreeVerticalDotsIcon} boxSize="14px" color="neutral.700" />;
};
const Plans = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading, isFetching } = useGetAllMaintenancePlanQuery({
    pageSize,
    pageNumber: currentPage,
  });
  const columnHelper = createColumnHelper<MaintenancePlan>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('maintenancePlanId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('planName', {
        cell: (info) => info.getValue(),
        header: 'Plan Name',
        enableSorting: false,
      }),
      columnHelper.accessor('planTypeName', {
        cell: (info) => info.getValue(),
        header: 'Plan Type',
        enableSorting: false,
      }),
      columnHelper.accessor('assetTypeName', {
        cell: (info) => info.getValue(),
        header: 'Asset Type',
        enableSorting: false,
      }),
      columnHelper.accessor('activeSchedules', {
        cell: (info) => info.getValue(),
        header: 'Total Schedules',
        enableSorting: false,
      }),
      columnHelper.accessor('startDate', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return dateFormatter(value, 'DD / MM / YYYY');
          } else {
            return 'N/A';
          }
        },
        header: 'Start Date',
        enableSorting: false,
      }),
      columnHelper.accessor('endDate', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return dateFormatter(value, 'DD / MM / YYYY');
          } else {
            return 'N/A';
          }
        },
        header: 'End Date',
        enableSorting: false,
      }),
      columnHelper.accessor('planStatusName', {
        cell: (info) => info.getValue(),
        header: 'Status',
        enableSorting: false,
      }),
      columnHelper.accessor('dateCreated', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return dateFormatter(value, 'DD / MM / YYYY');
          } else {
            return 'N/A';
          }
        },
        header: 'Created Date',
        enableSorting: false,
      }),
      columnHelper.accessor('rowId', {
        cell: () => Dots(),
        header: '',
        enableSorting: false,
      }),
    ],
    [[data?.data?.items]] //eslint-disable-line
  );

  return (
    <Flex direction="column" mt="32px">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        showFooter={true}
        emptyLines={15}
        isSelectable={false}
        isLoading={isLoading}
        isFetching={isFetching}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={data?.data?.totalPages}
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
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </Flex>
  );
};

export default Plans;
