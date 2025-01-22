import { HStack, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import TotalAssetSummary from '../../Common/Summaries/TotalAssetSummary';
import OpenTicketSummary from '../../Common/Summaries/OpenTicketSummary';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';
import ProgressIndicator from '../../Common/ProgressIndicator';
import PendingTask from './PendingTask';

const SectionOne = () => {
  const isLoading = false;
  const ticketValue = 600;
  return (
    <SimpleGrid width="full" spacing="16px" columns={5}>
      <TotalAssetSummary isLoading={false} />
      <OpenTicketSummary isLoading={false} />
      <PendingTask isLoading={false} />
      <SummaryCardWrapper
        title="Total Number of Vendors"
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
      <SummaryCardWrapper
        title="Number of Open Approval"
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
              Open Approvals
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
    </SimpleGrid>
  );
};

export default SectionOne;
