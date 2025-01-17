'use client';

import { Flex, Text } from '@chakra-ui/react';
import 'reactflow/dist/style.css';
import PageHeader from '../../UI/PageHeader';
import ApprovalFlowChart from './ApprovalFlowChart';

// Change the interface
interface IApprovalDetail {
  id: string;
  type: string;
}

interface ApprovalDetailProps {
  data: IApprovalDetail;
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
        #WRK00098 - Bulk Asset Transfer
      </Text>

      <ApprovalFlowChart />
    </Flex>
  );
};

export default ApprovalDetail;
