import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import ProgressIndicator from '../ProgressIndicator';
import SummaryCardWrapper from '../SummaryCardWrapper';
import { TicketIcon } from '~/lib/components/CustomIcons/Dashboard';

interface OpenTicketSummaryProps {
  isLoading: boolean;
}
const OpenTicketSummary = (props: OpenTicketSummaryProps) => {
  const { isLoading } = props;
  const ticketValue = 900;
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
              {ticketValue !== undefined ? ticketValue.toLocaleString() : '-'}
            </Text>
          </Skeleton>
          <Text color="neutral.600" fontWeight={700} mb="4px">
            This month
          </Text>
        </HStack>
        <HStack spacing="4px">
          <ProgressIndicator valueChange={0} />
          <Text color="neutral.600" fontWeight={700}>
            Compared to last month
          </Text>
        </HStack>
      </VStack>
    </SummaryCardWrapper>
  );
};

export default OpenTicketSummary;
