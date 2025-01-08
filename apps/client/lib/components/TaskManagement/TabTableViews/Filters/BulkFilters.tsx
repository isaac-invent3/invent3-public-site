import { Button, HStack, useDisclosure, useToast } from '@chakra-ui/react';
import UpdateMultipleTaskModal from '../../Modals/UpdateMultipleTaskModal';

const BulkActions = ({ selectedTaskIds }: { selectedTaskIds: number[] }) => {
  const toast = useToast();

  const {
    isOpen: isOpenUpdateTask,
    onOpen: onOpenUpdateTask,
    onClose: onCloseUpdateTask,
  } = useDisclosure();

  const handleBulkActionButtonClick = (buttonCallback: () => void) => {
    if (selectedTaskIds.length > 0) {
      buttonCallback();
    } else {
      toast({
        title: 'No Task Selected',
        description: 'Please select atleast one task',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  // Contemplating Using One modal and one Button for all three options
  return (
    <>
      <HStack spacing="7px" width="full">
        <Button
          minH="36px"
          bgColor="white"
          color="neutral.800"
          fontSize="12px"
          lineHeight="14.26px"
          fontWeight={700}
          pl="12px"
          pr="8px"
          onClick={() => handleBulkActionButtonClick(onOpenUpdateTask)}
        >
          Update Task
        </Button>

        <UpdateMultipleTaskModal
          isOpen={isOpenUpdateTask}
          onClose={onCloseUpdateTask}
          selectedTaskIds={selectedTaskIds}
        />
      </HStack>
    </>
  );
};

export default BulkActions;
