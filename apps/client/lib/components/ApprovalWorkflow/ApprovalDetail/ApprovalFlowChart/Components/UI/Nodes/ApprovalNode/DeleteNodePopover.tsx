import {
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import { useDeleteApprovalWorkflowPartyInstanceMutation } from '~/lib/redux/services/approval-workflow/partyInstances.services';

interface DeleteNodePopoverProps {
  approvalWorkflowPartyIntanceId: number;
}
const DeleteNodePopover = (props: DeleteNodePopoverProps) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [deleteApprovalWorkflowInstance, { isLoading: isDeleting }] =
    useDeleteApprovalWorkflowPartyInstanceMutation();

  const handleDeleteNode = async () => {
    const session = await getSession();

    await deleteApprovalWorkflowInstance({
      id: props.approvalWorkflowPartyIntanceId,
      deletedBy: session?.user?.username!,
    });

    onCloseDelete();
  };

  return (
    <Popover
      placement="right-start"
      autoFocus={false}
      onClose={onCloseDelete}
      isOpen={isOpenDelete}
    >
      <PopoverTrigger>
        <HStack
          w="full"
          cursor="pointer"
          color="primary.500"
          p="8px"
          rounded="4px"
          transition="all 200ms ease-in-out"
          onClick={onOpenDelete}
          _hover={{
            bgColor: 'neutral.200',
          }}
        >
          <Text>Delete Node</Text>
        </HStack>
      </PopoverTrigger>

      <PopoverContent
        bgColor="white"
        width="200px"
        boxShadow="0px 4px 32px 0px #00000026"
        rounded="8px"
        zIndex={9999}
        position="relative"
      >
        <PopoverBody m={0} p="8px">
          <Text fontSize="12px" mb={5} color="primary.500">
            Are you sure you want to delete this Node?
          </Text>
          <HStack>
            <Button
              handleClick={onCloseDelete}
              variant="secondary"
              customStyles={{
                height: '30px',
                fontSize: '12px',
              }}
            >
              No
            </Button>
            <Button
              handleClick={handleDeleteNode}
              isLoading={isDeleting}
              loadingText=""
              customStyles={{
                height: '30px',
                fontSize: '12px',
                bgColor: 'red.500',
                _hover: {
                  bgColor: 'initial',
                },
              }}
            >
              {isDeleting ? <Spinner size="sm" color="primary.500" /> : 'Yes'}
            </Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteNodePopover;
