/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useGetAllScheduleInstanceQuery } from '~/lib/redux/services/maintenance/scheduleInstance.services';
import PopoverAction from './PopoverAction';
import { Flex, useDisclosure } from '@chakra-ui/react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import TaskInstanceListView from '../../TaskManagement/Drawers/TaskListDrawer/TaskInstanceListView';

interface MaintenanceHistoryProp {
  search: string;
  openFilter: boolean;
}

const MaintenanceHistory = (props: MaintenanceHistoryProp) => {
  const { search, openFilter } = props;
  const columnHelper = createColumnHelper<MaintenanceScheduleInstance>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllScheduleInstanceQuery({
    pageSize,
    pageNumber: currentPage,
  });
  const { getSearchParam } = useCustomSearchParams();
  const maintenanceScheduleInstanceId = getSearchParam(
    'maintenanceScheduleInstanceId'
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (maintenanceScheduleInstanceId) {
      onOpen();
    }
  }, [maintenanceScheduleInstanceId]);

  const columns = useMemo(
    () => {
      const baseColumns = [
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
        columnHelper.accessor('scheduleInstanceName', {
          cell: (info) => info.getValue(),
          header: 'Plan Type',
          enableSorting: false,
        }),
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduleInstanceId', {
          cell: (info) => info.getValue(),
          header: 'Schedule ID',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduleInstanceName', {
          cell: (info) => info.getValue(),
          header: 'Schedule Name',
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
          header: 'Start Date',
          enableSorting: false,
        }),
        columnHelper.accessor('completionDate', {
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
        columnHelper.accessor('rowId', {
          cell: (info) => PopoverAction(info.row.original),

          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );
  return (
    <Flex width="full" direction="column" mt="24px">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={data?.data?.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        emptyLines={25}
        isSelectable={false}
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
        customTableContainerStyle={{ rounded: 'none' }}
      />
      {maintenanceScheduleInstanceId && (
        <TaskInstanceListView
          isOpen={isOpen}
          onClose={onClose}
          scheduleId={+maintenanceScheduleInstanceId}
          showPopover={false}
        />
      )}
    </Flex>
  );
};

export default MaintenanceHistory;
