import { Button, HStack, useDisclosure, useToast } from '@chakra-ui/react';

const BulkActions = ({ selectedTaskIds }: { selectedTaskIds: number[] }) => {
  const toast = useToast();

  const {
    isOpen: isOpenChangeStatus,
    onOpen: onOpenChangeStatus,
    onClose: onCloseChangeStatus,
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
          onClick={() => handleBulkActionButtonClick(onOpenChangeStatus)}
        >
          Change Status
        </Button>
        <Button
          minH="36px"
          bgColor="white"
          color="neutral.800"
          fontSize="12px"
          lineHeight="14.26px"
          fontWeight={700}
          pl="12px"
          pr="8px"
          onClick={() => handleBulkActionButtonClick(onOpenChangeStatus)}
        >
          Change Priority
        </Button>
        <Button
          minH="36px"
          bgColor="white"
          color="neutral.800"
          fontSize="12px"
          lineHeight="14.26px"
          fontWeight={700}
          pl="12px"
          pr="8px"
          onClick={() => handleBulkActionButtonClick(onOpenChangeStatus)}
        >
          Change Assigned To
        </Button>
      </HStack>
    </>
  );
};

export default BulkActions;
