import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { useAppSelector } from '~/lib/redux/hooks';

const ApprovalHeader = () => {
  const approvalRequest = useAppSelector(
    (state) => state.approval.approvalRequest
  );
  return (
    <VStack alignItems="flex-start">
      <GenericStatusBox
        text={approvalRequest?.currentStatusName ?? ''}
        colorCode={approvalRequest?.displayColorCode}
      />

      <HStack gap="24px" mt="16px">
        <Text color="neutral.600" size="md" width="90px">
          Workflow
        </Text>

        <Text color="primary.500" fontWeight={700} fontSize="18px">
          #{approvalRequest?.approvalRequestId} -{' '}
          {approvalRequest?.approvalTypeName}
        </Text>
      </HStack>
    </VStack>
  );
};

export default ApprovalHeader;
