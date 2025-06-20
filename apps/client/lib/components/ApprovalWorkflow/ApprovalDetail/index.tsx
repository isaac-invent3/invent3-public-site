'use client';

import { CheckIcon } from '@chakra-ui/icons';
import { Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import PageHeader from '../../UI/PageHeader';
import { ApprovalFlowProvider } from './ApprovalFlowChart/Components/Context';
import ApprovalFlowChart from './ApprovalFlowChart/Components/FlowChart';
import { useAppSelector } from '~/lib/redux/hooks';

const ApprovalDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const data = useAppSelector((state) => state.approval.approvalRequest);

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
          #{data?.approvalRequestId} - {data?.approvalTypeName}
        </Text>
        {isLoading && <Spinner color="primary.500" size="sm" />}

        {!isLoading && <CheckIcon />}
      </HStack>
      <ApprovalFlowProvider>
        <ApprovalFlowChart setIsLoading={setIsLoading} />
      </ApprovalFlowProvider>
    </Flex>
  );
};

export default React.memo(ApprovalDetail);
