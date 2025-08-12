import { Flex, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import {
  MaintenanceSchedule,
  ScheduleFormDetails,
} from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetMaintenanceSchedulesByPlanIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import {
  clearScheduleForm,
  updatePlanForm,
  updateScheduleForm,
} from '~/lib/redux/slices/MaintenanceSlice';
import { dateFormatter } from '~/lib/utils/Formatters';
import ActionPopover from './ActionPopover';
import { LeaveDialogModal, DataTable } from '@repo/ui/components';
import AddScheduleButtonWithErrorMessage from './AddScheduleButtonWithErrorMessage';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface MaintenanceSchedulesProps {
  type: 'create' | 'edit' | 'list';
  showScheduleInfo: boolean;
  setShowScheduleInfo: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRows: number[];
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  selectMultiple: boolean;
}

const ScheduleList = (props: MaintenanceSchedulesProps) => {
  const {
    type,
    showScheduleInfo,
    setShowScheduleInfo,
    selectedRows,
    setSelectedRows,
    selectMultiple,
  } = props;

  const { planId, schedules: allPlanSchedules } = useAppSelector(
    (state) => state.maintenance.planForm
  );
  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [action, setAction] = useState<'new' | 'update' | null>(null);
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } =
    useGetMaintenanceSchedulesByPlanIdQuery(
      {
        id: planId!,
        pageSize,
        pageNumber: currentPage,
      },
      { skip: !planId }
    );
  const columnHelper = createColumnHelper<ScheduleFormDetails>();

  const handleProceedDialogForAddSchedule = () => {
    setAction('new');
    setSelectedRows([]);
    dispatch(clearScheduleForm());
    setShowScheduleInfo(true);
    onCloseDialog();
  };

  const handleProceedDialogForSelectedRow = (items: number[]) => {
    setSelectedRows(items);
    onCloseDialog();
  };

  const [handleProceed, setHandleProceed] = useState(
    () => handleProceedDialogForAddSchedule
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('name', {
          cell: (info) => info.getValue(),
          header: 'Schedule',
          enableSorting: false,
        }),
        columnHelper.accessor('typeName', {
          cell: (info) => info.getValue(),
          header: 'Type',
          enableSorting: false,
        }),
        columnHelper.accessor('frequencyName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Frequency',
          enableSorting: false,
        }),
        columnHelper.accessor('taskCount', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'No. Of Tasks',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduledDate', {
          cell: (info) =>
            dateFormatter(
              info.getValue(),
              'DD/MM/YYYY hh:mmA',
              'DD/MM/YYYY HH:mm',
              type === 'edit'
            ),
          header: 'Start Date',
          enableSorting: false,
        }),
      ];
      const popoverColumn = columnHelper.accessor('frequencyId', {
        cell: (info) => ActionPopover(type as 'edit', info.row.original),
        header: '',
        enableSorting: false,
      });

      if (type !== 'list') {
        baseColumns.push(popoverColumn);
      }
      return baseColumns;
    },
    [[allPlanSchedules]] //eslint-disable-line
  );

  useEffect(() => {
    if (selectedRows.length >= 1) {
      const schedule: ScheduleFormDetails | undefined =
        allPlanSchedules[selectedRows?.[0] as number];
      if (schedule) {
        dispatch(updateScheduleForm(schedule));
        setAction('update');
        setShowScheduleInfo(true);
      }
    } else if (action === 'update') {
      dispatch(clearScheduleForm());
      setShowScheduleInfo(false);
    }
  }, [selectedRows]);

  // Clear selectedRows if showSchedule Info is changed to false
  useEffect(() => {
    if (!showScheduleInfo) {
      setSelectedRows([]);
    }
  }, [showScheduleInfo]);

  const formattedSchedules = useMemo(() => {
    if (data?.data && data?.data?.items?.length >= 1) {
      const schedules: MaintenanceSchedule[] = data.data.items;
      return schedules.map((item) => ({
        name: item.scheduleName,
        localId: item.scheduleId,
        scheduleId: item.scheduleId,
        planId: item.maintenancePlanId,
        typeId: item.maintenanceTypeId,
        typeName: item.maintenanceType,
        assetId: item.assetId,
        assetTypeId: item.assetTypeId,
        assetName: item.assetName,
        sla: item.sla,
        frequencyId: item.frequencyId,
        frequencyName: item.frequencyName,
        assetLocation: item.assetLocation,
        description: item.description,
        comment: item.comments,
        scheduledDate: dateFormatter(
          item.scheduledDate,
          'DD/MM/YYYY HH:mm',
          undefined,
          type === 'edit'
        ),
        endDate: item.endDate ?? null,
        intervalValue: 1,
        dayOccurrences: [],
        weekOccurrences: [],
        monthOccurrences: [],
        yearOccurrences: {},
        deletedTaskIDs: [],
        updatedTaskIDs: [],
        completionDate: dateFormatter(
          item.completionDate,
          'DD/MM/YYYY HH:mm',
          undefined,
          type === 'edit'
        ),
        ticketId: item.ticketId,
        maintenancePlanInfo: {
          planName: item.planName,
          planType: item.maintenanceType,
          assetName: null,
          assetTypeName: null,
          planStatus: null,
          startDate: null,
          endDate: null,
        },
        taskCount: item.activeTasksCount,
        tasks: [],
        firstInstanceDate: null,
      }));
    }
    return [];
  }, [data?.data?.items]);

  useEffect(() => {
    if (formattedSchedules.length > 0) {
      // Only add schedules from formattedSchedules that don't already exist in allPlanSchedules based on localId
      const existingLocalIds = new Set(allPlanSchedules.map((s) => s.localId));
      const newSchedules = formattedSchedules.filter(
        (s) => !existingLocalIds.has(s.localId)
      );
      if (newSchedules.length > 0) {
        dispatch(
          updatePlanForm({
            schedules: [...allPlanSchedules, ...newSchedules],
          })
        );
      }
    }
  }, [formattedSchedules]);

  const handleAddSchedule = () => {
    if (selectedRows.length > 0) {
      setHandleProceed(() => handleProceedDialogForAddSchedule);
      onOpenDialog();
    } else {
      handleProceedDialogForAddSchedule();
    }
  };

  const handleSetSelectedRows = (items: number[]) => {
    // Show the Form Dialog modal only when the type is create or edit
    if (selectedRows.length > 0 && type !== 'list') {
      setHandleProceed(() => () => {
        handleProceedDialogForSelectedRow(items);
      });
      onOpenDialog();
    } else {
      setSelectedRows(items);
    }
  };

  return (
    <Flex direction="column" width="full" gap="25px" alignItems="start">
      <DataTable
        columns={columns}
        data={allPlanSchedules}
        showFooter={type === 'edit'}
        emptyLines={5}
        isSelectable={true}
        hideSelectAllCheckBox={!selectMultiple}
        isLoading={isLoading}
        isFetching={isFetching}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={data?.data?.totalPages}
        selectedRows={selectedRows}
        setSelectedRows={(items) => handleSetSelectedRows(items)}
        selectMultipleRows={selectMultiple}
        showEmptyState={type === 'edit'}
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
      {(type === 'create' || type === 'edit') && (
        <AddScheduleButtonWithErrorMessage
          handleAddSchedule={handleAddSchedule}
        />
      )}
      <LeaveDialogModal
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
        handleProceed={handleProceed}
      />
    </Flex>
  );
};

export default ScheduleList;
