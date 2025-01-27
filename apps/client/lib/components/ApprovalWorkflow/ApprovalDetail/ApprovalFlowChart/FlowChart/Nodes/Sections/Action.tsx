import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  CursorIcon,
  ThreeVerticalDotsIcon,
} from '~/lib/components/CustomIcons';
import AddApprovalActionModal from '../../../Components/UI/Modals/AddActionModal';
import { CustomNodeData } from '../../../Context/interfaces';

const Action = (props: { data: CustomNodeData; nodeId: string }) => {
  const { data, nodeId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!data.actionId) {
    return (
      <>
        <HStack w="full" justifyContent="space-between">
          <Box
            padding="6px"
            borderWidth="1px"
            borderColor="#65656533"
            background="#6565651A"
            width="max-content"
            rounded="6px"
            minWidth="90px"
          >
            <Text color="#838383">Not Started</Text>
          </Box>

          <Icon as={ThreeVerticalDotsIcon} />
        </HStack>

        <HStack
          onClick={onOpen}
          gap="5px"
          transition="all 200ms ease-in-out"
          _hover={{
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          <Icon as={AddIcon} color="#0366EF" boxSize="12px" />

          <Text fontWeight={700} color="#0366EF">
            1. Select Action
          </Text>
        </HStack>

        <AddApprovalActionModal
          nodeId={nodeId}
          isOpen={isOpen}
          onClose={onClose}
        />
      </>
    );
  }

  const { actionName, actionStatus, approveeType } = data;

  const getStatus = () => {
    switch (actionStatus) {
      case 'pending':
        return {
          borderColor: '#EABC3080',
          backgroundColor: '#EABC300D',
          textColor: '#A07905',
          displayName: 'In Progress',
        };

      case 'not-started':
        return {
          borderColor: '#65656533',
          backgroundColor: '#6565651A',
          textColor: '#838383',
          displayName: 'Not Started',
        };

      default:
        return {
          borderColor: '#EABC3080',
          backgroundColor: '#EABC300D',
          textColor: '#A07905',
          displayName: 'Invalid Status',
        };
    }
  };

  const statusStyles = getStatus();

  return (
    <VStack alignItems="flex-start" gap="12px" w="full">
      {actionStatus === 'completed' && (
        <Flex
          alignItems="center"
          justifyContent="center"
          w="24px"
          h="24px"
          rounded="full"
          background="#07CC3B26"
        >
          <Icon as={CheckIcon} color="#018A1E" boxSize="14px" />
        </Flex>
      )}

      {actionStatus !== 'completed' && (
        <Box
          padding="6px"
          borderWidth="1px"
          borderColor={statusStyles.borderColor}
          background={statusStyles.backgroundColor}
          width="max-content"
          rounded="6px"
          minWidth="90px"
        >
          <Text color={statusStyles.textColor}>{statusStyles.displayName}</Text>
        </Box>
      )}

      <Text size="md" color="primary.500">
        {actionName}
      </Text>

      <HStack alignItems="center" gap="16px">
        <Icon as={CursorIcon} />

        <Text color="neutral.600">
          {approveeType === 'individual' ? data.approveeRole : 'Group'}
        </Text>
      </HStack>
    </VStack>
  );
};

export default Action;
