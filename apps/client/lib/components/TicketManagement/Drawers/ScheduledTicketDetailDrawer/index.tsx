import {
  DrawerBody,
  DrawerHeader,
  Flex,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import SectionOne from '../Common/SectionOne';
import ScheduleInfoHeader from '../Common/ScheduleInfoHeader';
import MarkTicketAsCompletedModal from '../../Modals/MarkTicketAsCompletedModal';
import TicketActivity from '../Common/TicketActivity';

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

            <HStack spacing="8px">
              <Button customStyles={{ width: '107px', height: '35px' }}>
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
          <Flex
            direction="column"
            width="full"
            alignItems="flex-start"
            pb="20px"
          >
            <ScheduleInfoHeader data={data} />
            <SectionOne data={data} type="scheduled" />
            <TicketActivity />
          </Flex>
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
