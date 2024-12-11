import { useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useDeleteTicketMutation } from '~/lib/redux/services/ticket.services';
import { GenericDeleteModal } from '@repo/ui/components';

interface DeleteTicketSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Ticket;
}
const DeleteTicketSuccessModal = (props: DeleteTicketSuccessModalProps) => {
  const { isOpen, onClose, data } = props;

  const toast = useToast();

  const [deleteTicket, { isLoading }] = useDeleteTicketMutation({});
  const { data: session } = useSession();

  const handleDeleteTask = async () => {
    await deleteTicket({
      id: data.ticketId,
      deletedBy: session?.user.username,
    });

    toast({
      title: 'Ticket Deleted Successfully',
      status: 'success',
      position: 'top-right',
    });

    onClose();
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
