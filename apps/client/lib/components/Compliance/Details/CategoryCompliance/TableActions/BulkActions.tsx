import { Button, HStack, useDisclosure, useToast } from '@chakra-ui/react';
import { useAppSelector } from '~/lib/redux/hooks';
import MarkComplianceStatusDrawer from '../../../Drawers/MarkComplianceStatusDrawer';

const BulkActions = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedTableIds = useAppSelector(
    (state) => state.common.selectedTableIds
  );

  const handleBulkActionButtonClick = (buttonCallback: () => void) => {
    if (selectedTableIds.length > 0) {
      buttonCallback();
    } else {
      toast({
        title: 'No Asset Selected',
        description: 'Please select atleast one asset',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
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
          onClick={() => handleBulkActionButtonClick(onOpen)}
        >
          Mark Compliance Status
        </Button>
      </HStack>
      <MarkComplianceStatusDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default BulkActions;
