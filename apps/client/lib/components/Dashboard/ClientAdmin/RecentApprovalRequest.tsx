import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../Common/CardHeader';
import { Button } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { useGetTicketsByTabScopeQuery } from '~/lib/redux/services/ticket.services';
import ApprovalTable from '../../Approval/ApprovalTable';

const RecentApprovalRequest = () => {
  const { data, isLoading, isFetching } = useGetTicketsByTabScopeQuery({
    pageNumber: 1,
    pageSize: 5,
    tabScopeName: 'new',
  });

  return (
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
          href={`/${ROUTES.TICKETS}`}
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
      <ApprovalTable
        approvalCategory="all"
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        isSelectable={false}
        emptyLines={4}
        showFooter={false}
      />
    </VStack>
  );
};

export default RecentApprovalRequest;
