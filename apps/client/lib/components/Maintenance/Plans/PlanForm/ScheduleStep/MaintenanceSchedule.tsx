import { Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';
import React, { useEffect, useMemo, useState } from 'react';
import AddButton from '~/lib/components/UI/Form/FormAddButton';
import GenericDeleteModal from '~/lib/components/UI/Modal/GenericDeleteModal';
import DataTable from '~/lib/components/UI/Table';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useDeleteMaintenanceScheduleMutation,
  useGetMaintenanceSchedulesByPlanIdQuery,
} from '~/lib/redux/services/maintenance/schedule.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import { dateFormatter } from '~/lib/utils/Formatters';
import ScheduleModalForm from '../../../Schedules/ScheduleForm/ScheduleModalForm';

const Action = (info: MaintenanceSchedule) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { handleSubmit } = useCustomMutation();
  const [deleteSchedule, { isLoading }] = useDeleteMaintenanceScheduleMutation(
    {}
  );
  const { data } = useSession();

  const handleDeleteSchedule = async () => {
    const response = await handleSubmit(
      deleteSchedule,
      { id: info?.scheduleId, deletedBy: data?.user.username },
      'Schedule Deleted Successfully'
    );
    if (response?.data) {
      onClose();
    }
  };

  return (
    <>
      <Text color="#F50000" cursor="pointer" onClick={onOpen}>
        Delete
      </Text>
      {isOpen && (
        <GenericDeleteModal
          isOpen={isOpen}
          onClose={onClose}
          handleDelete={handleDeleteSchedule}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

const MaintenanceSchedules = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { planId } = useAppSelector((state) => state.maintenance.planForm);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
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
  const columnHelper = createColumnHelper<MaintenanceSchedule>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('scheduleId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('scheduleName', {
        cell: (info) => info.getValue(),
        header: 'Schedule',
        enableSorting: false,
      }),
      columnHelper.accessor('maintenanceType', {
        cell: (info) => info.getValue(),
        header: 'Type',
        enableSorting: false,
      }),
      columnHelper.accessor('maintenanceType', {
        cell: (info) => info.getValue(),
        header: 'Frequency',
        enableSorting: false,
      }),
      columnHelper.accessor('activeTasksCount', {
        cell: (info) => info.getValue(),
        header: 'No. Of Tasks',
        enableSorting: false,
      }),
      columnHelper.accessor('scheduledDate', {
        cell: (info) =>
          dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
        header: 'Start Date',
        enableSorting: false,
      }),
      columnHelper.accessor('completionDate', {
        cell: (info) =>
          dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
        header: 'End Date',
        enableSorting: false,
      }),
      columnHelper.accessor('rowId', {
        cell: (info) => Action(info.row.original),
        header: '',
        enableSorting: false,
      }),
    ],
    [[data?.data?.items]] //eslint-disable-line
  );

  useEffect(() => {
    if (selectedRows.length >= 1) {
      const schedule: MaintenanceSchedule =
        data?.data?.items[selectedRows?.[0] as number];
      if (schedule) {
        dispatch(
          updateScheduleForm({
            name: schedule?.scheduleName,
            scheduleId: schedule?.scheduleId,
            planId: schedule?.maintenancePlanId,
            typeId: schedule?.maintenanceTypeId,
            typeName: schedule?.maintenanceType,
            assetId: schedule?.assetId,
            assetName: schedule?.assetName,
            assetTypeId: schedule?.assetTypeId,
            sla: schedule?.sla,
            frequencyId: schedule?.frequencyId,
            frequencyName: schedule?.frequencyName,
            assetLocation: schedule?.assetLocation,
            description: schedule?.description,
            comment: schedule?.comments,
            taskCount: schedule?.activeTasksCount,
            scheduledDate: schedule?.scheduledDate
              ? dateFormatter(schedule?.scheduledDate, 'DD/MM/YYYY hh:mmA')
              : null,
            completionDate: schedule?.completionDate
              ? dateFormatter(schedule?.completionDate, 'DD/MM/YYYY hh:mmA')
              : null,
          })
        );
      }
    } else {
      dispatch(
        updateScheduleForm({
          name: null,
          scheduleId: null,
          planId: null,
          typeId: null,
          typeName: null,
          assetId: null,
          assetName: null,
          assetTypeId: null,
          sla: null,
          frequencyId: null,
          frequencyName: null,
          assetLocation: null,
          description: null,
          comment: null,
          taskCount: null,
          scheduledDate: null,
          completionDate: null,
        })
      );
    }
  }, [selectedRows]);

  return (
    <Flex direction="column" width="full" gap="8px">
      <HStack width="full" justifyContent="space-between">
        <Text color="primary.500" size="md" fontWeight={700}>
          Select a schedule to edit from the table
        </Text>
        <AddButton handleClick={onOpen} color="#0366EF">
          Add New Schedule
        </AddButton>
      </HStack>
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        showFooter={true}
        emptyLines={5}
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
    </Flex>
  );
};

export default MaintenanceSchedules;
