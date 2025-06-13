import { Text, useDisclosure } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import React from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';

interface DeletePopoverProps {
  id: number;
  mutationFn: (...args: any[]) => Promise<any>;
  isLoading: boolean;
}
const DeletePopover = ({ id, mutationFn, isLoading }: DeletePopoverProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { handleSubmit } = useCustomMutation();
  const session = useSession();

  const handleDeleteLocation = async () => {
    await handleSubmit(
      mutationFn,
      {
        id: id!,
        deletedBy: session?.data?.user.username!,
      },
      'Record Deleted Successfully'
      //   onClose
    );
  };

  return (
    <>
      <GenericPopover placement="bottom-start" width="120px">
        <Text color="#F50000" onClick={onOpen}>
          Delete
        </Text>
      </GenericPopover>
      <GenericDeleteModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDeleteLocation}
      />
    </>
  );
};

export default DeletePopover;
