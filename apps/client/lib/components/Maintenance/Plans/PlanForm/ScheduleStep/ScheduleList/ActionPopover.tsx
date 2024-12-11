import { Text, useDisclosure } from '@chakra-ui/react';
import { GenericDeleteModal } from '@repo/ui/components';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updatePlanForm } from '~/lib/redux/slices/MaintenanceSlice';

const ActionPopover = (type: 'create' | 'edit', info: ScheduleFormDetails) => {
  const { schedules, deletedScheduleIDs } = useAppSelector(
    (state) => state.maintenance.planForm
  );
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleDeleteSchedule = async () => {
    const newSchedules = schedules.filter(
      (item) => item.localId !== info.localId
    );
    dispatch(updatePlanForm({ schedules: newSchedules }));
    //Mark as deleted
    if (info.scheduleId) {
      dispatch(
        updatePlanForm({
          deletedScheduleIDs: [...deletedScheduleIDs, info.scheduleId],
        })
      );
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
