'use client';

import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { ApprovalWorkflowType } from '~/lib/interfaces/approvalWorkflow.interfaces';
import ApprovalTable from './ApprovalTable';
import Header from './Header';

const ApprovalWorkFlow = () => {
  const [selectedApprovalType, setSelectedApprovalType] =
    useState<ApprovalWorkflowType | null>(null);

  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header setSelectedApprovalType={setSelectedApprovalType} />
      <ApprovalTable selectedApprovalType={selectedApprovalType} />
    </Flex>
  );
};

export default ApprovalWorkFlow;
