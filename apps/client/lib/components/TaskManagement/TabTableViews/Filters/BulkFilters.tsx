import { Button, HStack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '~/lib/utils/constants';
import { saveSelectedTaskIds } from '../../Common/utils';

const BulkActions = ({ selectedTaskIds }: { selectedTaskIds: number[] }) => {
  const toast = useToast();
  const router = useRouter();

  const handleBulkActionButtonClick = (buttonCallback: () => void) => {
    if (selectedTaskIds.length > 0) {
      buttonCallback();
    } else {
      toast({
        title: 'No Task Selected',
        description: 'Please select at least one task',
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
          onClick={() =>
            handleBulkActionButtonClick(() => {
              saveSelectedTaskIds(selectedTaskIds);
              router.push(`/${ROUTES.TASKS}/bulk-update`);
            })
          }
        >
          Update Task
        </Button>
      </HStack>
    </>
  );
};

export default BulkActions;
