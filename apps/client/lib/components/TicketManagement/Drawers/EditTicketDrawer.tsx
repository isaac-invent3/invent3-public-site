import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Task } from '~/lib/interfaces/task.interfaces';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useCreateTaskMutation } from '~/lib/redux/services/task/general.services';
import { useUpdateTicketMutation } from '~/lib/redux/services/ticket.services';
import ScheduledTicketTasks from './Common/ScheduledTicketTasks';
import TicketActivity from './Common/TicketActivity';
import TicketDrawerWrapper from './TicketDrawerWrapper';
import {
  useGetMaintenanceSchedulesByTicketIdQuery,
  useUpdateMaintenanceScheduleAndTasksMutation,
} from '~/lib/redux/services/maintenance/schedule.services';
import { FORM_ENUM } from '~/lib/utils/constants';
import { useState } from 'react';

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

  const formik = useFormik<EditTicketForm>({
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
      const requestBody = {
        ticketId: data.ticketId,
        lastModifiedBy: username,
        ticketTypeId: payload.ticketTypeId,
        ticketPriorityId: payload.ticketPriorityId,
        ticketStatusId: payload.ticketStatusId,
        assignedTo: payload.assignedTo,
      };

      await handleSubmit(
        updateScheduleAndTask,
        {
          updateMaintenanceScheduleDto: {
            scheduleId: maintenanceSchedule?.data?.scheduleId,
            actionType: FORM_ENUM.update,
            changeInitiatedBy: username!,
          },
          updateTaskDtos: payload.tasks
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
        toast({
          title: 'Ticket Was Updated Successfully',
          status: 'success',
          position: 'top-right',
        });

        onClose();
      }
    },
  });

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
        {/* <TicketActivity /> */}
        <ScheduledTicketTasks
          data={data}
          scheduleId={maintenanceSchedule?.data?.scheduleId}
          isFetchingSchedule={isFetchingSchedule}
        />
      </TicketDrawerWrapper>
    </>
  );
};

export default EditTicketDrawer;
