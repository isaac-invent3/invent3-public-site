import { Button, HStack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '~/lib/utils/constants';
import { saveSelectedTicketIds } from '../utils';

const BulkActions = ({
  selectedTicketIds,
}: {
  selectedTicketIds: number[];
}) => {
  const toast = useToast();
  const router = useRouter();

  const handleBulkActionButtonClick = (buttonCallback: () => void) => {
    if (selectedTicketIds.length > 0) {
      buttonCallback();
    } else {
      toast({
        title: 'No Ticket Selected',
        description: 'Please select at least one ticket',
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
              saveSelectedTicketIds(selectedTicketIds);
              router.push(`/${ROUTES.TICKETS}/bulk-update`);
            })
          }
        >
          Update Ticket
        </Button>
      </HStack>
    </>
  );
};

export default BulkActions;
