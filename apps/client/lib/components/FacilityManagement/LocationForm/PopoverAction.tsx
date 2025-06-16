/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';

interface PopoverActionProps {
  handleEdit?: () => void;
  handleDelete: () => void;
}

const PopoverAction = ({ handleEdit, handleDelete }: PopoverActionProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Text cursor="pointer" color="#F50000" onClick={onOpen}>
        Delete
      </Text>
      <GenericDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default PopoverAction;
