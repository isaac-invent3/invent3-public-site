import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useAppSelector } from '~/lib/redux/hooks';

const ApprovalHeader = () => {
  const approvalRequest = useAppSelector(
    (state) => state.approval.approvalRequest
  );
  return (
    <VStack alignItems="flex-start">
      <Box
        padding="6px"
        color="#A07905"
        borderWidth="1px"
        borderColor="#EABC3080"
        background="#EABC300D"
        width="max-content"
        rounded="6px"
        minWidth="90px"
      >
        <Text color="#A07905">{approvalRequest?.currentStatusName}</Text>
      </Box>

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
