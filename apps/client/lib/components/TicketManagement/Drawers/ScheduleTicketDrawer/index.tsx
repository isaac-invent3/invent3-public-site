import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import SectionOne from '../Common/SectionOne';
import { FormikProvider, useFormik } from 'formik';
import { scheduleTicketSchema } from '~/lib/schemas/ticket.schema';
import TaskAssignedTo from '~/lib/components/TaskManagement/Common/AssignedTo';
import ResolutionDate from './ResolutionDate';
import Tasks from '~/lib/components/Maintenance/Schedules/ScheduleForm/FormSection/SectionTwo/Tasks';
import ScheduleTicketSuccessModal from '../../Modals/ScheduleTicketSuccessModal';
import ScheduleInfoHeader from '../Common/ScheduleInfoHeader';

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

  const formik = useFormik({
    initialValues: {
      tasks: [],
      assignedTo: null,
      resolutionDate: null,
      taskCount: 0,
    },
    validationSchema: scheduleTicketSchema,
    enableReinitialize: true,
    onSubmit: async () => {
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
              handleClick={formik.handleSubmit}
              customStyles={{ width: '126px', height: '35px' }}
            >
              Schedule Ticket
            </Button>
          </HStack>
        </DrawerFooter>
      </GenericDrawer>
      <ScheduleTicketSuccessModal
        isOpen={isOpenSuccess}
        onClose={onCloseSuccess}
      />
    </>
  );
};

export default ScheduleTicketDrawer;
