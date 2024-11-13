import {
  DrawerBody,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useUpdateTicketMutation } from '~/lib/redux/services/ticket.services';
import { updateTicketSchema } from '~/lib/schemas/ticket.schema';
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

const ScheduledTicketDetailDrawer = (
  props: ScheduledTicketDetailDrawerProps
) => {
  const { isOpen, onClose, data } = props;

  const {
    isOpen: isOpenMarkAsCompleted,
    onOpen: onOpenMarkAsCompleted,
    onClose: onCloseMarkAsCompleted,
  } = useDisclosure();

  const { data: session } = useSession();

  const username = session?.user?.username;

  const { handleSubmit } = useCustomMutation();

  const [updateTicketMutation, { isLoading: updatingTicket }] =
    useUpdateTicketMutation();

  const formik = useFormik({
    initialValues: {
      tasks: [],
      assignedTo: null,
      taskCount: 0,
      status: null,
      priority: null,
      ticketType: null,
    },
    validationSchema: updateTicketSchema,
    enableReinitialize: true,
    onSubmit: async (payload) => {
      const requestBody = {
        ticketId: data.ticketId,
        ticketTitle: data.ticketTitle,
        issueDescription: data.issueDescription,
        issueReportDate: data.issueReportDate,
        assetId: data.assetId,
        lastModifiedBy: username,
      };

      await handleSubmit(updateTicketMutation, requestBody, '');
    },
  });

  /**
   * TODO: Integrate with API Endpoint
   * Connect Status and Priority with the Form
   * 
   */

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
                isLoading={updatingTicket}
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
                <ScheduledTicketTasks />
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
