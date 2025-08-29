/* eslint-disable no-unused-vars */
import { Heading, HStack, ModalBody, Text, VStack } from '@chakra-ui/react';

import { Button, GenericModal } from '@repo/ui/components';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';

interface ReOpenTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Ticket;
  handleUpdate: () => Promise<void>;
  isLoading: boolean;
}
const ReOpenTicketModal = (props: ReOpenTicketModalProps) => {
  const { isOpen, onClose, data, handleUpdate, isLoading } = props;

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
            py="68px"
            spacing="55px"
            alignItems="center"
          >
            <VStack width="full" spacing="8px" alignItems="center">
              <Heading
                fontWeight={800}
                fontSize="32px"
                lineHeight="38.02px"
                color="primary.500"
              >
                Re-open Ticket?
              </Heading>
              <Text
                color="neutral.700"
                size="md"
                maxW="291px"
                textAlign="center"
              >
                You are about to mark this ticket{' '}
                <Text as="span" fontWeight={800}>
                  {data?.ticketId}
                </Text>{' '}
                as opened, Is this correct?
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
                customStyles={{ width: '193px' }}
                handleClick={handleUpdate}
                isLoading={isLoading}
              >
                Yes, Re-open
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </GenericModal>
    </>
  );
};

export default ReOpenTicketModal;
