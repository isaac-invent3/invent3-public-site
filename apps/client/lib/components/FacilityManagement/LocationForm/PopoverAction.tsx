/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';

interface PopoverActionProps {
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const PopoverAction = ({ handleEdit, handleDelete }: PopoverActionProps) => {
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={handleEdit}>
            Edit
          </Text>
          <Text cursor="pointer" color="#F5000080" onClick={handleDelete}>
            Delete
          </Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
