/* eslint-disable no-unused-vars */
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';

interface MarkTicketAsCompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Ticket;
}
const MarkTicketAsCompletedModal = (props: MarkTicketAsCompletedModalProps) => {
  const { isOpen, onClose, data } = props;
  const { data: session } = useSession();
  const { handleSubmit } = useCustomMutation();
  // const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation({});

  const handleMarkAsCompleted = () => {};

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { md: '526px' } }}
      >
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
              customStyles={{ width: '193px' }}
              handleClick={handleMarkAsCompleted}
            >
              Continue
            </Button>
          </HStack>
        </VStack>
      </GenericModal>
    </>
  );
};

export default MarkTicketAsCompletedModal;
