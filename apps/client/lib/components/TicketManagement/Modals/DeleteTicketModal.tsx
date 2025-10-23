import { useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useDeleteTicketMutation } from '~/lib/redux/services/ticket.services';
import { GenericDeleteModal } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';

interface DeleteTicketSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Ticket;
}
const DeleteTicketSuccessModal = (props: DeleteTicketSuccessModalProps) => {
  const { isOpen, onClose, data } = props;
  const { handleSubmit } = useCustomMutation();

  const [deleteTicket, { isLoading }] = useDeleteTicketMutation({});
  const { data: session } = useSession();

  const handleDeleteTask = async () => {
    const response = await handleSubmit(
      deleteTicket,
      {
        id: data.ticketId,
        deletedBy: session?.user.username,
      },
      'Ticket Deleted Successfully'
    );
    if (response?.data) {
      onClose();
    }
  };

  return (
    <GenericDeleteModal
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      handleDelete={handleDeleteTask}
    />
  );
};

export default DeleteTicketSuccessModal;
