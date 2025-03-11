'use client';

import { Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import { ApprovalWorkflowRequest } from '~/lib/interfaces/approvalWorkflow.interfaces';
import PageHeader from '../../UI/PageHeader';
import ApprovalFlowChart from './ApprovalFlowChart';
import { CheckIcon } from '@chakra-ui/icons';

interface ApprovalDetailProps {
  data: ApprovalWorkflowRequest;
}

const ApprovalDetail = (props: ApprovalDetailProps) => {
  return (
    <Flex width="full" direction="column" pb="24px">
      <PageHeader>Approval Requests</PageHeader>
      <HStack mt="8px" mb="24px">
        <Text
          color="neutral.600"
          fontWeight={800}
          fontSize="18px"
          lineHeight="21.38px"
        >
          #{props.data.approvalRequestId} - {props.data.approvalTypeName}
        </Text>
        <Spinner color="primary.500" size="sm" />
        <CheckIcon />
      </HStack>
      <ApprovalFlowChart />
    </Flex>
  );
};

export default ApprovalDetail;
