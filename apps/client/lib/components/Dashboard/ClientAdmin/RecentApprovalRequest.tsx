import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../Common/CardHeader';
import { Button } from '@repo/ui/components';
import useApprovalFlowPendingRequestTable from '../hooks/useApprovalFlowPendingRequest';
import ApprovalFlowPendingRequestModal from '../Modals/ApprovalFlowPendingRequestModal';

const RecentApprovalRequest = () => {
  const { ApprovalFlowPendingRequestTable } =
    useApprovalFlowPendingRequestTable({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack
        width="full"
        pl="16px"
        pr="15px"
        pt="21px"
        pb="12px"
        alignItems="flex-start"
        spacing="16px"
        bgColor="white"
        rounded="8px"
        minH="382px"
      >
        <HStack width="full" justifyContent="space-between">
          <CardHeader>Recent Approval Request</CardHeader>
          <Button
            handleClick={onOpen}
            customStyles={{
              py: 0,
              height: '28px',
              width: '68px',
              fontSize: '12px',
              lineHeight: '14.26px',
            }}
          >
            View All
          </Button>
        </HStack>
        {ApprovalFlowPendingRequestTable}
      </VStack>
      {isOpen && (
        <ApprovalFlowPendingRequestModal isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default RecentApprovalRequest;
