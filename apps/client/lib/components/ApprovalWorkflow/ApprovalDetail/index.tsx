'use client';

import { Flex, Text } from '@chakra-ui/react';
import { ApprovalWorkflowRequest } from '~/lib/interfaces/approvalWorkflow.interfaces';
import PageHeader from '../../UI/PageHeader';
import ApprovalFlowChart from './ApprovalFlowChart';

interface ApprovalDetailProps {
  data: ApprovalWorkflowRequest;
}

const ApprovalDetail = (props: ApprovalDetailProps) => {
  return (
    <Flex width="full" direction="column" pb="24px">
      <PageHeader>Approval Requests</PageHeader>
      <Text
        color="neutral.600"
        fontWeight={800}
        fontSize="18px"
        lineHeight="21.38px"
        mt="8px"
        mb="24px"
      >
        #{props.data.approvalRequestId} - {props.data.approvalTypeName}
      </Text>

      <ApprovalFlowChart />
    </Flex>
  );
};

export default ApprovalDetail;
