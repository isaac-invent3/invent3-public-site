import { Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import AddButton from '~/lib/components/UI/Form/FormAddButton';
import DataTable from '~/lib/components/UI/Table';
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
import ScheduleModalForm from '~/lib/components/Maintenance/Schedules/ScheduleForm/ScheduleModalForm';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import { useField } from 'formik';
import GenericLeaveDialogModal from '~/lib/components/UI/Modal/LeaveDialogModal';

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
  let metaProps;

  // Check if the component is within a Formik context
  try {
    // eslint-disable-next-line no-unused-vars
    const [field, meta, helpers] = useField('schedules');
    metaProps = meta;
  } catch (error) {
    // Do nothing
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { planId, schedules: allPlanSchedules } = useAppSelector(
    (state) => state.maintenance.planForm
  );
  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [action, setAction] = useState<'new' | 'update' | null>(null);
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } =
    useGetMaintenanceSchedulesByPlanIdQuery(
      {
        id: planId,
        pageSize,
        pageNumber: currentPage,
      },
      { skip: !planId }
    );
  const columnHelper = createColumnHelper<ScheduleFormDetails>();
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
          cell: (info) => info.getValue(),
          header: 'Frequency',
          enableSorting: false,
        }),
        columnHelper.accessor('taskCount', {
          cell: (info) => info.getValue(),
          header: 'No. Of Tasks',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduledDate', {
          cell: (info) => info.getValue(),
          header: 'Start Date',
          enableSorting: false,
        }),
      ];
      const scheduleIdColumn = columnHelper.accessor('scheduleId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      });

      const popoverColumn = columnHelper.accessor('frequencyId', {
        cell: (info) => ActionPopover(type as 'edit', info.row.original),
        header: '',
        enableSorting: false,
      });

      if (type === 'edit') {
        baseColumns.unshift(scheduleIdColumn);
      }
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

  // Clear selectedRows is showSchedule Info is changed to false
  useEffect(() => {
    if (!showScheduleInfo) {
      setSelectedRows([]);
    }
  }, [showScheduleInfo]);

  useEffect(() => {
    if (data?.data) {
      if (data?.data?.items?.length >= 1) {
        const schedules: MaintenanceSchedule[] = data?.data?.items;
        const formattedSchedules: ScheduleFormDetails[] = [];
        schedules.forEach((item) => {
          formattedSchedules.push({
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
              'DD/MM/YYYY hh:mmA'
            ),
            completionDate: dateFormatter(
              item.completionDate,
              'DD/MM/YYYY hh:mmA'
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
          });
        });
        dispatch(
          updatePlanForm({
            schedules: [...allPlanSchedules, ...formattedSchedules],
          })
        );
      }
    }
  }, [data]);

  const handleProceedDialog = () => {
    setAction('new');
    setSelectedRows([]);
    dispatch(clearScheduleForm());
    setShowScheduleInfo(true);
    onCloseDialog();
  };

  const handleAddSchedule = () => {
    if (selectedRows.length > 0) {
      onOpenDialog();
    } else {
      handleProceedDialog();
    }
  };

  return (
    <Flex direction="column" width="full" gap="25px" alignItems="start">
      {type === 'edit' && (
        <HStack width="full" justifyContent="space-between">
          <Text color="primary.500" size="md" fontWeight={700}>
            Select a schedule to edit from the table
          </Text>
          <AddButton handleClick={onOpen} color="#0366EF">
            Add New Schedule
          </AddButton>
        </HStack>
      )}
      <DataTable
        columns={columns}
        data={allPlanSchedules ?? []}
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
        setSelectedRows={setSelectedRows}
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
        customTableContainerStyle={{ rounded: 'none' }}
      />
      <ScheduleModalForm isOpen={isOpen} onClose={onClose} />
      {type === 'create' && (
        <Flex width="full" justifyContent="center">
          <AddButton
            handleClick={() => handleAddSchedule()}
            color="#0366EF"
            customStyle={{ spacing: '8px' }}
            customTextStyle={{ fontWeight: 700 }}
          >
            Add a Schedule
          </AddButton>
        </Flex>
      )}
      {metaProps && metaProps.touched && metaProps.error !== undefined && (
        <ErrorMessage>{metaProps.error}</ErrorMessage>
      )}
      <GenericLeaveDialogModal
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
        handleProceed={handleProceedDialog}
      />
    </Flex>
  );
};

export default ScheduleList;
