import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Tasks from '~/lib/components/Maintenance/Schedules/ScheduleForm/FormSection/SectionTwo/Tasks';
import TaskAssignedTo from '~/lib/components/TaskManagement/Common/AssignedTo';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { Ticket, TicketCategory } from '~/lib/interfaces/ticket.interfaces';
import {
  useScheduleTicketsMutation,
  useUpdateTicketMutation,
} from '~/lib/redux/services/ticket.services';
import { scheduleTicketSchema } from '~/lib/schemas/ticket.schema';
import { FORM_ENUM } from '~/lib/utils/constants';
import { generateTasksArray } from '../../Maintenance/Common/helperFunctions';
import {
  Button,
  DateTimeButtons,
  ErrorMessage,
  FormInputWrapper,
} from '@repo/ui/components';
import ScheduleTicketSuccessModal from '../Modals/ScheduleTicketSuccessModal';
import TicketDrawerWrapper from './TicketDrawerWrapper';
import { useAppDispatch } from '~/lib/redux/hooks';
import { clearSelectedTicket } from '~/lib/redux/slices/TicketSlice';

interface AssignTicketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Ticket;
  category: TicketCategory;
}

export interface ScheduleTicketForm {
  taskCount: number;
  tasks: taskFormDetails[];
  assignedTo: null | number;
  assignedToEmployeeName: string | null;
  resolutionDate: string | null;
  ticketStatusId: number | null;
  ticketPriorityId: number | null;
  ticketTypeId: number | null;
}

const ScheduleTicketDrawer = (props: AssignTicketDrawerProps) => {
  const { isOpen, onClose, data, category } = props;

  const [scheduleTicketMutation, { isLoading: isScheduling }] =
    useScheduleTicketsMutation();

  const [updateTicketMutation, { isLoading: isUpdatingTicket }] =
    useUpdateTicketMutation();

  const { data: session } = useSession();

  const { handleSubmit } = useCustomMutation();
  const dispatch = useAppDispatch();

  const username = session?.user?.username;

  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();

  const formik = useFormik<ScheduleTicketForm>({
    initialValues: {
      tasks: [],
      taskCount: 0,
      resolutionDate: null,
      assignedTo: data.assignedToEmployeeId ?? null,
      assignedToEmployeeName: data.assignedTo ?? null,
      ticketStatusId: data.ticketStatusId ?? null,
      ticketPriorityId: data.ticketPriorityId ?? null,
      ticketTypeId: data.ticketTypeId ?? null,
    },

    validationSchema: scheduleTicketSchema(
      moment(moment()).format('DD/MM/YYYY') ?? undefined
    ),
    enableReinitialize: true,

    onSubmit: async (payload) => {
      await updateTicketMutation({
        id: data.ticketId,
        ticketId: data.ticketId,
        assignedTo: payload.assignedTo,
        lastModifiedBy: username,
        ticketStatusId: payload.ticketStatusId,
        ticketPriorityId: payload.ticketPriorityId,
        ticketTypeId: payload.ticketTypeId,
      });

      const response = await handleSubmit(scheduleTicketMutation, {
        createMaintenanceScheduleDto: {
          scheduleName: props.data.ticketTitle,
          ticketId: props.data.ticketId,
          assignedTo: payload.assignedTo,
          actionType: FORM_ENUM.add,
          changeInitiatedBy: username,
          scheduledDate: moment(
            moment().format('DD/MM/YYYY HH:mm'),
            'DD/MM/YYYY hh:mmA'
          ).utc(),
          endDate: moment(payload.resolutionDate, 'DD/MM/YYYY hh:mmA').utc(),
        },

        createTaskDtos: generateTasksArray(
          payload.tasks,
          [],
          username as string
        ),
      });

      response.data && onOpenSuccess();
    },
  });

  const ScheduleDrawerFooter = () => {
    return (
      <HStack
        spacing="8px"
        justifyContent="flex-end"
        mt="8px"
        px="24px"
        pb="32px"
      >
        <Button
          customStyles={{ width: '84px', height: '35px' }}
          variant="secondary"
          handleClick={onClose}
        >
          Cancel
        </Button>

        <Button
          isLoading={isScheduling || isUpdatingTicket}
          handleClick={() => {
            formik.handleSubmit();
          }}
          customStyles={{ width: '126px', height: '35px' }}
        >
          Schedule Ticket
        </Button>
      </HStack>
    );
  };

  return (
    <>
      <TicketDrawerWrapper
        data={data}
        category={category}
        action="schedule"
        isOpen={isOpen}
        formik={formik}
        onClose={onClose}
        drawerFooter={<ScheduleDrawerFooter />}
      >
        <VStack width="full" spacing="24px">
          {category === 'new' && (
            <TaskAssignedTo sectionMaxWidth="141px" spacing="24px" />
          )}

          <FormInputWrapper
            sectionMaxWidth="141px"
            customSpacing="24px"
            description="Specify the deadline for task completion"
            title="Resolution Date"
            isRequired
          >
            <VStack width="full" spacing="12px" alignItems="flex-start">
              <DateTimeButtons
                buttonVariant={'secondary'}
                includeTime={true}
                minDate={new Date()}
                selectedDate={
                  formik.values.resolutionDate?.split(' ')?.[0] ?? undefined
                }
                handleDateTimeSelect={(dateTime) => {
                  formik.setFieldValue('resolutionDate', dateTime ?? null);
                }}
              />

              {formik.submitCount > 0 &&
                formik.touched &&
                formik.errors.resolutionDate !== undefined && (
                  <ErrorMessage>{formik.errors.resolutionDate}</ErrorMessage>
                )}
            </VStack>
          </FormInputWrapper>

          <Tasks sectionMaxWidth="141px" spacing="24px" />
        </VStack>
      </TicketDrawerWrapper>

      <ScheduleTicketSuccessModal
        isOpen={isOpenSuccess}
        onClose={() => {
          onCloseSuccess();
          onClose();
          dispatch(clearSelectedTicket());
        }}
      />
    </>
  );
};

export default ScheduleTicketDrawer;
