/* eslint-disable no-unused-vars */
import {
  Heading,
  HStack,
  ModalBody,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { Button, GenericModal } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { useUpdateTicketMutation } from '~/lib/redux/services/ticket.services';
import MarkAsCompletedSuccessModal from './SuccessModal';

interface MarkTicketAsCompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Ticket;
}
const MarkTicketAsCompletedModal = (props: MarkTicketAsCompletedModalProps) => {
  const { isOpen, onClose, data } = props;
  const [updateTicketMutation, { isLoading }] = useUpdateTicketMutation();
  // Isaac, when i used this, it threw an error that useContext was not found
  // const { DEFAULT_COMPLETED_TASK_STATUS_ID } = useAppSelector(
  //   (state) => state.general.appConfigValues
  // );
  const {
    isOpen: isMarkAsCompletedSuccessOpen,
    onClose: onMarkAsCompletedSuccessClose,
    onOpen: onMarkAsCompletedSuccessOpen,
  } = useDisclosure();

  const handleMarkAsCompleted = async () => {
    const session = await getSession();

    if (!data) return;

    const response = await updateTicketMutation({
      id: data.ticketId,
      ticketId: data.ticketId,
      ticketStatusId:  3,
      lastModifiedBy: session?.user?.username,
    });

    if (response) {
      onMarkAsCompletedSuccessOpen();
    }
  };

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { md: '526px' } }}
      >
        <ModalBody p={0} m={0} width="full">
          <VStack
            width="full"
            px="32px"
            pt="113px"
            pb="102px"
            spacing="80px"
            alignItems="center"
          >
            <VStack width="full" spacing="8px" alignItems="center">
              <Heading
                fontWeight={800}
                fontSize="32px"
                lineHeight="38.02px"
                color="primary.500"
              >
                Mark as completed?
              </Heading>
              <Text color="neutral.700" size="md">
                You are about to mark this ticket{' '}
                <Text as="span" fontWeight={800}>
                  {data?.ticketId}
                </Text>{' '}
                as completed
              </Text>
            </VStack>
            <HStack width="full" spacing="24px" justifyContent="center">
              <Button
                variant="secondary"
                customStyles={{ width: '96px' }}
                handleClick={onClose}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                customStyles={{ width: '193px' }}
                handleClick={handleMarkAsCompleted}
              >
                Continue
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </GenericModal>

      <MarkAsCompletedSuccessModal
        isOpen={isMarkAsCompletedSuccessOpen}
        onClose={() => {
          onMarkAsCompletedSuccessClose();
          onClose();
        }}
      />
    </>
  );
};

export default MarkTicketAsCompletedModal;
