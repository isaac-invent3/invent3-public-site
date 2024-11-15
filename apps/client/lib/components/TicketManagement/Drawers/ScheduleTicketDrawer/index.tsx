import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { generateTasksArray } from '~/lib/components/Maintenance/Common/helperFunctions';
import Tasks from '~/lib/components/Maintenance/Schedules/ScheduleForm/FormSection/SectionTwo/Tasks';
import TaskAssignedTo from '~/lib/components/TaskManagement/Common/AssignedTo';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useScheduleTicketsMutation } from '~/lib/redux/services/ticket.services';
import { scheduleTicketSchema } from '~/lib/schemas/ticket.schema';
import { FORM_ENUM } from '~/lib/utils/constants';
import ScheduleTicketSuccessModal from '../../Modals/ScheduleTicketSuccessModal';
import ScheduleInfoHeader from '../Common/ScheduleInfoHeader';
import SectionOne from '../Common/SectionOne';
import ResolutionDate from './ResolutionDate';

interface ScheduleTicketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Ticket;
}

const ScheduleTicketDrawer = (props: ScheduleTicketDrawerProps) => {
  const { isOpen, onClose, data } = props;
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();

  const [scheduleTicketMutation, { isLoading: isScheduling }] =
    useScheduleTicketsMutation();
  const { data: session } = useSession();

  const username = session?.user?.username;

  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      tasks: [],
      assignedTo: null,
      scheduledDate: null,
      taskCount: 0,
    },
    validationSchema: scheduleTicketSchema,
    enableReinitialize: true,
    onSubmit: async (data) => {
       await handleSubmit(
        scheduleTicketMutation,
        {
          createMaintenanceScheduleDto: {
            scheduledDate: moment(
              data.scheduledDate,
              'DD/MM/YYYY hh:mmA'
            ).utcOffset(0, true),
            ticketId: props.data.ticketId,
            assignedTo: data.assignedTo,
            actionType: FORM_ENUM.add,
            changeInitiatedBy: username,
          },
          createTaskDtos: generateTasksArray(
            data.tasks,
            [],
            username as string
          ),
        },
        ''
      );

      onOpenSuccess();
    },
  });

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="507px">
        <DrawerHeader p={0} m={0}>
          <HStack
            pt="16px"
            pb="32px"
            px="24px"
            width="full"
            justifyContent="space-between"
          >
            <BackButton handleClick={onClose} />
          </HStack>
        </DrawerHeader>
        <DrawerBody p={0}>
          <Flex
            direction="column"
            width="full"
            alignItems="flex-start"
            pb="20px"
          >
            <ScheduleInfoHeader data={data} />
            <SectionOne data={data} type="new" />
            <FormikProvider value={formik}>
              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <VStack width="full" spacing="24px" px="24px" mt="22px">
                  <TaskAssignedTo sectionMaxWidth="141px" spacing="24px" />
                  <ResolutionDate />
                  <Tasks sectionMaxWidth="141px" spacing="24px" />
                </VStack>
              </form>
            </FormikProvider>
          </Flex>
        </DrawerBody>
        <DrawerFooter p={0} m={0}>
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
              isLoading={isScheduling}
              handleClick={() => {
                formik.handleSubmit();
              }}
              customStyles={{ width: '126px', height: '35px' }}
            >
              Schedule Ticket
            </Button>
          </HStack>
        </DrawerFooter>
      </GenericDrawer>
      <ScheduleTicketSuccessModal
        isOpen={isOpenSuccess}
        onClose={() => {
          onCloseSuccess()
          onClose()
        }}
      />
    </>
  );
};

export default ScheduleTicketDrawer;
