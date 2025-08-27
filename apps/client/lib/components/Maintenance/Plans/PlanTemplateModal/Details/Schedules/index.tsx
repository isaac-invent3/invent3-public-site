import { Heading, useMediaQuery, VStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from '@repo/ui/components';
import {
  MaintenanceSchedule,
  SingleMaintenancePlan,
} from '~/lib/interfaces/maintenance.interfaces';
import { useGetMaintenanceSchedulesByPlanIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { dateFormatter } from '~/lib/utils/Formatters';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import ScheduleSummary from '~/lib/components/Maintenance/Schedules/ScheduleForm/SummarySection/SectionTwo';
import ScheduleTasks from './ScheduleTasks';

interface MaintenanceSchedulesProps {
  plan: SingleMaintenancePlan;
}

const Schedule = (props: MaintenanceSchedulesProps) => {
  const { plan } = props;
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } =
    useGetMaintenanceSchedulesByPlanIdQuery(
      {
        id: plan?.maintenancePlanId,
        pageSize,
        pageNumber: currentPage,
      },
      { skip: !plan?.maintenancePlanId }
    );
  const columnHelper = createColumnHelper<MaintenanceSchedule>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('scheduleId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduleName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Schedule Title',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduledDate', {
          cell: (info) => {
            return (
              dateFormatter(info.getValue(), 'DD / MM / YYYY hh:mmA') ?? 'N/A'
            );
          },
          header: 'Start Date and Time',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('scheduleId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduleName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Schedule Title',
          enableSorting: false,
        }),
        columnHelper.accessor('maintenanceType', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Type',
          enableSorting: false,
        }),
        columnHelper.accessor('frequencyName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Frequency',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduledDate', {
          cell: (info) => {
            return (
              dateFormatter(info.getValue(), 'DD / MM / YYYY hh:mmA') ?? 'N/A'
            );
          },
          header: 'Start Date and Time',
          enableSorting: false,
        }),

        columnHelper.accessor('openTasks', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'No. Of Tasks',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  // Empty selected rows array when page size or page number changes
  useEffect(() => {
    setSelectedRows([]);
  }, [pageSize, currentPage]);

  return (
    <VStack width="full" alignItems="flex-start" spacing="24px">
      <DataTable
        columns={isMobile ? mobileColumns : columns}
        data={data?.data?.items ?? []}
        showFooter={
          data?.data ? (data?.data?.totalPages > 1 ? true : false) : false
        }
        emptyLines={3}
        isSelectable={true}
        hideSelectAllCheckBox={true}
        isLoading={isLoading}
        isFetching={isFetching}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={data?.data?.totalPages}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectMultipleRows={false}
        showEmptyState
        paginationStyle={{ bgColor: 'transparent' }}
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '17px',
          paddingBottom: '17px',
          fontWeight: 700,
          bgColor: '#B4BFCA80',
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '16px',
          paddingBottom: '16px',
          bgColor: '#F2F1F1',
        }}
        customTBodyRowStyle={{ verticalAlign: 'top' }}
        customTableContainerStyle={{ rounded: 'none', bgColor: 'transparent' }}
      />
      <VStack width="full" spacing="24px">
        {selectedRows.map((item, index) => {
          const schedule: MaintenanceSchedule | undefined =
            data?.data?.items.find(
              (schedule: MaintenanceSchedule, index: number) => index === item
            );

          if (schedule) {
            return (
              <VStack alignItems="flex-start" width="full">
                <Heading
                  color="black"
                  fontWeight={800}
                  fontSize="14px"
                  lineHeight="16.63px"
                >
                  Schedule’s Detail
                </Heading>
                <VStack
                  alignItems="flex-start"
                  width="full"
                  p="16px"
                  rounded="8px"
                  bgColor="#F5F6F7"
                  spacing="16px"
                >
                  <ScheduleSummary
                    showTasks={false}
                    formDetails={{
                      ...schedule,
                      planId: schedule.maintenancePlanId,
                      name: schedule.scheduleName,
                      localId: schedule.scheduleId,
                      typeId: schedule.maintenanceTypeId,
                      typeName: schedule.maintenanceType,
                      comment: schedule.comments,
                      deletedTaskIDs: [],
                      updatedTaskIDs: [],
                      taskCount: schedule.activeTasksCount,
                      tasks: [],
                      intervalValue: 1,
                      dayOccurrences: [],
                      weekOccurrences: [],
                      monthOccurrences: [],
                      yearOccurrences: {},
                      firstInstanceDate: '',
                      maintenancePlanInfo: null,
                      scheduledDate: dateFormatter(
                        schedule.scheduledDate,
                        'DD/MM/YYYY hh:mmA'
                      ),
                    }}
                    key={index}
                  />
                  <ScheduleTasks
                    scheduleId={schedule.scheduleId}
                    type="template"
                  />
                </VStack>
              </VStack>
            );
          }
          return null;
        })}
      </VStack>
    </VStack>
  );
};

export default Schedule;
