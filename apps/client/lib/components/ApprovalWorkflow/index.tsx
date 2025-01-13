'use client';

import { Flex } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import ApprovalTable from './ApprovalTable';
import Header from './Header';

const ApprovalWorkFlow = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );

  const approvalCategory = useMemo(() => {
    if (tabIndex === 1) return 'disposal';
    if (tabIndex === 2) return 'transfer';

    return 'all';
  }, [tabIndex]);
  return (
    <Flex width="full" direction="column" pb="24px">
      <Header tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <ApprovalTable approvalCategory={approvalCategory} />
    </Flex>
  );
};

export default ApprovalWorkFlow;
