import { useAppFormik } from '~/lib/hooks/useAppFormik';
import { useDisclosure, useToast } from '@chakra-ui/react';
import {} from 'formik';
import { useSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Task } from '~/lib/interfaces/task.interfaces';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useUpdateTicketMutation } from '~/lib/redux/services/ticket.services';
import ScheduledTicketTasks from './Common/ScheduledTicketTasks';
import TicketDrawerWrapper from './TicketDrawerWrapper';
import {
  useGetMaintenanceSchedulesByTicketIdQuery,
  useUpdateMaintenanceScheduleAndTasksMutation,
} from '~/lib/redux/services/maintenance/schedule.services';
import { FORM_ENUM } from '~/lib/utils/constants';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import ReOpenTicketModal from '../Modals/ReOpenTicketModal';
import ReopenedSuccessModal from '../Modals/ReOpenTicketModal/ReopenedSuccessModal';
import { taskApi } from '~/lib/redux/services/task/general.services';

interface EditTicketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Ticket;
}

export interface EditTicketForm {
  tasks: Task[];
  taskCount: number;
  ticketStatusId: number | null;
  ticketPriorityId: number | null;
  ticketTypeId: number | null;
  assignedTo: number | null;
  assignedToEmployeeName: string | null;
}

const EditTicketDrawer = (props: EditTicketDrawerProps) => {
  const { isOpen, onClose, data } = props;

  const [updateTicketMutation, { isLoading: isUpdatingTicket }] =
    useUpdateTicketMutation();

  const { data: maintenanceSchedule, isLoading: isFetchingSchedule } =
    useGetMaintenanceSchedulesByTicketIdQuery({
      ticketId: props.data.ticketId!,
    });

  const [updateScheduleAndTask, { isLoading: isUpdating }] =
    useUpdateMaintenanceScheduleAndTasksMutation();

  const toast = useToast();
  const { data: session } = useSession();
  const { handleSubmit } = useCustomMutation();
  const username = session?.user?.username;
  const dispatch = useAppDispatch();
  const appConfigValue = useAppSelector(
    (state) => state.general.appConfigValues
  );
  const completedStatusId =
    typeof appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID === 'string'
      ? +appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID
      : appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID;

  const shouldReopenTicket = data?.ticketStatusId === completedStatusId;

  const {
    isOpen: reOpenIsOpen,
    onClose: reOpenOnClose,
    onOpen: reOpenOnOpen,
  } = useDisclosure();
  const {
    isOpen: reOpenSuccessIsOpen,
    onClose: reOpenSuccessOnClose,
    onOpen: reOpenSuccessOnOpen,
  } = useDisclosure();

  const formik = useAppFormik<EditTicketForm>({
    initialValues: {
      tasks: [],
      taskCount: 0,
      ticketStatusId: data.ticketStatusId,
      ticketPriorityId: data.ticketPriorityId,
      ticketTypeId: data.ticketTypeId,
      assignedTo: data.assignedToEmployeeId ?? null,
      assignedToEmployeeName: data.assignedTo ?? null,
    },

    // validationSchema: scheduleTicketSchema,
    enableReinitialize: true,
    onSubmit: async (payload) => {
      if (shouldReopenTicket) {
        reOpenOnOpen();
      } else {
        handleUpdateTicket();
      }
    },
  });

  const handleUpdateTicket = async () => {
    const requestBody = {
      ticketId: data.ticketId,
      lastModifiedBy: username,
      ticketTypeId: formik.values.ticketTypeId,
      ticketPriorityId: formik.values.ticketPriorityId,
      ticketStatusId: formik.values.ticketStatusId,
      assignedTo: formik.values.assignedTo,
    };

    await handleSubmit(
      updateScheduleAndTask,
      {
        updateMaintenanceScheduleDto: {
          scheduleId: maintenanceSchedule?.data?.scheduleId,
          actionType: FORM_ENUM.update,
          changeInitiatedBy: username!,
        },
        updateTaskDtos: formik.values.tasks
          .filter((item) => item.taskId === null)
          .map((task) => ({
            taskId: null,
            taskDescription: task.taskDescription!,
            taskName: task.taskName!,
            scheduleId: task.scheduleId!,
            taskTypeId: task.taskTypeId!,
            priorityId: task.priorityId!,
            assignedTo: task.assignedTo!,
            estimatedDurationInHours: task.estimatedDurationInHours!,
            costEstimate: task.costEstimate!,
            comments: task.comments!,
            actionType: FORM_ENUM.add,
            changeInitiatedBy: username!,
          })),
      },
      ''
    );

    const response = await updateTicketMutation({
      id: data.ticketId,
      ...requestBody,
    });

    if (response) {
      if (shouldReopenTicket) {
        reOpenSuccessOnOpen();
      } else {
        dispatch(taskApi.util.invalidateTags(['allTasksByScheduleId']));
        toast({
          title: 'Ticket Was Updated Successfully',
          status: 'success',
          position: 'top-right',
        });
        onClose();
      }
    }
  };

  return (
    <>
      <TicketDrawerWrapper
        data={data}
        category="scheduled"
        action="edit"
        isOpen={isOpen}
        formik={formik}
        onClose={onClose}
        isEditing={isUpdatingTicket || isUpdating}
        handleEdit={() => formik.handleSubmit()}
      >
        <ScheduledTicketTasks
          data={data}
          scheduleId={maintenanceSchedule?.data?.scheduleId}
          isFetchingSchedule={isFetchingSchedule}
        />
      </TicketDrawerWrapper>
      <ReOpenTicketModal
        isOpen={reOpenIsOpen}
        onClose={reOpenOnClose}
        data={data}
        isLoading={isUpdating || isUpdatingTicket}
        handleUpdate={handleUpdateTicket}
      />
      <ReopenedSuccessModal
        isOpen={reOpenSuccessIsOpen}
        onClose={() => {
          reOpenSuccessOnClose();
          onClose();
        }}
      />
    </>
  );
};

export default EditTicketDrawer;
