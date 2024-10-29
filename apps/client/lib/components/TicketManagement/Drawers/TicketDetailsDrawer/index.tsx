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
import GenericDeleteModal from '~/lib/components/UI/Modal/GenericDeleteModal';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import InfoHeader from './InfoHeader';
import SectionOne from '../Common/SectionOne';
import ScheduleTicketDrawer from '../ScheduleTicketDrawer';

interface TicketDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Ticket;
}

const TicketDetailsDrawer = (props: TicketDetailsDrawerProps) => {
  const { isOpen, onClose, data } = props;
  const {
    isOpen: isOpenScheduleTicket,
    onOpen: onOpenScheduleTicket,
    onClose: onCloseScheduleTicket,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteTicket,
    onOpen: onOpenDeleteTicket,
    onClose: onCloseDeleteTicket,
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
              <Button
                handleClick={onOpenScheduleTicket}
                customStyles={{ width: '126px', height: '35px' }}
              >
                Schedule Ticket
              </Button>
              <Button
                customStyles={{ width: '84px', height: '35px' }}
                variant="secondary"
                handleClick={onOpenDeleteTicket}
              >
                Delete
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
            <InfoHeader data={data} />
            <SectionOne data={data} type="new" />
          </Flex>
        </DrawerBody>
      </GenericDrawer>
      <GenericDeleteModal
        isOpen={isOpenDeleteTicket}
        onClose={onCloseDeleteTicket}
        handleDelete={() => {}}
      />
      <ScheduleTicketDrawer
        isOpen={isOpenScheduleTicket}
        onClose={onCloseScheduleTicket}
        data={data}
      />
    </>
  );
};

export default TicketDetailsDrawer;
