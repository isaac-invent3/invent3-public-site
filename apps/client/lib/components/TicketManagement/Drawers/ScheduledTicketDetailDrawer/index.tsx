import {
  DrawerBody,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Task } from '~/lib/interfaces/task.interfaces';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useCreateTaskMutation } from '~/lib/redux/services/task/general.services';
import { useUpdateTicketMutation } from '~/lib/redux/services/ticket.services';
import MarkTicketAsCompletedModal from '../../Modals/MarkTicketAsCompletedModal';
import ScheduleInfoHeader from '../Common/ScheduleInfoHeader';
import SectionOne from '../Common/SectionOne';
import TicketActivity from '../Common/TicketActivity';
import ScheduledTicketTasks from './ScheduledTicketTasks';

interface ScheduledTicketDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Ticket;
}

export interface ScheduleTicketFormDetails {
  tasks: Task[];
  taskCount: number;
  ticketStatusId: number | null;
  ticketPriorityId: number | null;
  ticketTypeId: number | null;
  assignedTo: number | null;
}

const ScheduledTicketDetailDrawer = (
  props: ScheduledTicketDetailDrawerProps
) => {
  const { isOpen, onClose, data } = props;

  const {
    isOpen: isOpenMarkAsCompleted,
    onOpen: onOpenMarkAsCompleted,
    onClose: onCloseMarkAsCompleted,
  } = useDisclosure();

  const toast = useToast();
  const { data: session } = useSession();
  const { handleSubmit } = useCustomMutation();

  const username = session?.user?.username;

  const [updateTicketMutation, { isLoading: isUpdatingTicket }] =
    useUpdateTicketMutation();

  const [createTask, { isLoading: isCreatingTask }] = useCreateTaskMutation({});

  const formik = useFormik<ScheduleTicketFormDetails>({
    initialValues: {
      tasks: [],
      taskCount: 0,
      ticketStatusId: null,
      ticketPriorityId: null,
      ticketTypeId: null,
      assignedTo: null,
    },
    // validationSchema: updateTicketSchema,
    enableReinitialize: true,
    onSubmit: async (payload) => {
      const requestBody = {
        ticketId: data.ticketId,
        lastModifiedBy: username,
        ticketTypeId: payload.ticketTypeId,
        ticketPriorityId: payload.ticketPriorityId,
        ticketStatusId: payload.ticketStatusId,
      };

      await Promise.all(
        payload.tasks.map(async (task) => {
          await handleSubmit(createTask, { ...task, createdBy: username }, '');
        })
      );

      // Directly using this method instead of the handle submit function, as the latter throws an error when the response is empty, and this request does not return any response.
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
      }
    },
  });

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="535px">
        <DrawerHeader p={0} m={0}>
          <HStack
            pt="16px"
            pb="32px"
            px="24px"
            width="full"
            justifyContent="space-between"
          >
            <BackButton handleClick={onClose} />

            <HStack spacing="8px">
              <Button
                isLoading={isUpdatingTicket || isCreatingTask}
                handleClick={() => formik.handleSubmit()}
                customStyles={{ width: '107px', height: '35px' }}
              >
                Save Changes
              </Button>
              <Button
                customStyles={{ width: '139px', height: '35px' }}
                variant="secondary"
                handleClick={onOpenMarkAsCompleted}
              >
                Mark as Completed
              </Button>
            </HStack>
          </HStack>
        </DrawerHeader>
        <DrawerBody p={0}>
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <Flex
                direction="column"
                width="full"
                alignItems="flex-start"
                pb="20px"
              >
                <Heading
                  fontSize="32px"
                  lineHeight="38.02px"
                  color="#0E2642"
                  fontWeight={800}
                  px="24px"
                  pb="16px"
                >
                  Edit Ticket
                </Heading>
                <ScheduleInfoHeader data={data} isUpdateTicket />
                <SectionOne data={data} type="scheduled" />
                <TicketActivity />
                <ScheduledTicketTasks data={data} />
              </Flex>
            </form>
          </FormikProvider>
        </DrawerBody>
      </GenericDrawer>
      <MarkTicketAsCompletedModal
        isOpen={isOpenMarkAsCompleted}
        onClose={onCloseMarkAsCompleted}
        data={data}
      />
    </>
  );
};

export default ScheduledTicketDetailDrawer;
