import { AddIcon, CalendarIcon } from '@chakra-ui/icons';
import { HStack, Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
import UserInfo from '~/lib/components/Common/UserInfo';
import { ApprovalWorkflowPartyInstance } from '~/lib/interfaces/approvalWorkflow.interfaces';
import AddApprovalUserModal from '../../Modals/AddUserModal';

const Approval = (props: {
  data: ApprovalWorkflowPartyInstance;
  nodeId: string;
}) => {
  const { data, nodeId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!data.userId) {
    return (
      <>
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
            2. Select Approver
          </Text>
        </HStack>

        <AddApprovalUserModal
          nodeId={nodeId}
          isOpen={isOpen}
          onClose={onClose}
        />
      </>
    );
  }

  const { firstName, lastName } = data;

  return (
    <VStack alignItems="flex-start" gap="12px" w="full">
      <UserInfo
        name={`${firstName} ${lastName}`}
        textStyle={{
          color: '#0366EF',
          cursor: 'pointer',
          transition: 'all 200ms ease-in-out',
          _hover: {
            textDecoration: 'underline',
            textUnderlineOffset: 2,
          },
        }}
        customAvatarStyle={{
          width: '24px',
          height: '24px',
        }}
        customBoxStyle={{
          spacing: '16px',
        }}
      />

      <HStack alignItems="center" gap="16px">
        <Icon as={CalendarIcon} />

        <Text color="neutral.600" isTruncated>
          {/* {data.date ?? '- -'} */}
        </Text>
      </HStack>
    </VStack>
  );
};

export default Approval;
