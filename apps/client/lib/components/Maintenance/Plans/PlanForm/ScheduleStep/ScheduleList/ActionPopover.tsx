import { Text, useDisclosure } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import GenericDeleteModal from '~/lib/components/UI/Modal/GenericDeleteModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useDeleteMaintenanceScheduleMutation } from '~/lib/redux/services/maintenance/schedule.services';
import { updatePlanForm } from '~/lib/redux/slices/MaintenanceSlice';

const ActionPopover = (type: 'create' | 'edit', info: ScheduleFormDetails) => {
  const { schedules } = useAppSelector((state) => state.maintenance.planForm);
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { handleSubmit } = useCustomMutation();
  const [deleteSchedule, { isLoading }] = useDeleteMaintenanceScheduleMutation(
    {}
  );
  const { data } = useSession();

  const handleDeleteSchedule = async () => {
    if (type === 'edit') {
      const response = await handleSubmit(
        deleteSchedule,
        { id: info?.scheduleId, deletedBy: data?.user.username },
        'Schedule Deleted Successfully'
      );
      if (response?.data) {
        onClose();
      }
    }
    const newSchedules = schedules.filter(
      (item) => item.scheduleId !== info.scheduleId
    );
    dispatch(updatePlanForm({ schedules: newSchedules }));
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
        >
          <Text size="md" color="#A00000" width="full">
            By deleting this schedule,{' '}
            <Text fontWeight={800} as="span">
              {info.taskCount} active tasks
            </Text>{' '}
            will also be deleted
          </Text>
        </GenericDeleteModal>
      )}
    </>
  );
};

export default ActionPopover;
