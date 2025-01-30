import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import ProgressIndicator from '../ProgressIndicator';
import SummaryCardWrapper from '../../../Common/SummaryCardWrapper';
import { TicketIcon } from '~/lib/components/CustomIcons/Dashboard';

interface OpenTicketSummaryProps {
  isLoading: boolean;
  ticketCount: number | undefined;
  percentChange: number | undefined;
}
const OpenTicketSummary = (props: OpenTicketSummaryProps) => {
  const { isLoading, ticketCount, percentChange } = props;
  return (
    <SummaryCardWrapper
      title="Open Ticket"
      icon={TicketIcon}
      containerStyle={{ minH: '164px' }}
    >
      <VStack
        justifyContent="space-between"
        alignItems="flex-start"
        height="full"
      >
        <HStack alignItems="flex-end" spacing="4px">
          <Skeleton isLoaded={!isLoading}>
            <Text
              mt="8px"
              fontSize="24px"
              lineHeight="28.51px"
              fontWeight={800}
              color="primary.500"
            >
              {ticketCount?.toLocaleString() ?? '-'}
            </Text>
          </Skeleton>
          <Text color="neutral.600" fontWeight={700} mb="4px">
            This month
          </Text>
        </HStack>
        <HStack spacing="4px">
          <Skeleton isLoaded={!isLoading}>
            <ProgressIndicator valueChange={percentChange ?? 0} />
          </Skeleton>
          <Text color="neutral.600" fontWeight={700}>
            Compared to last month
          </Text>
        </HStack>
      </VStack>
    </SummaryCardWrapper>
  );
};

export default OpenTicketSummary;
