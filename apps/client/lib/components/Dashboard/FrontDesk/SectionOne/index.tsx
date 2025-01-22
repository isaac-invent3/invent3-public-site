import { HStack, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';
import { MaintenanceIcon } from '~/lib/components/CustomIcons/Dashboard';
import TaskOverview from './TaskOverview';
import OpenTicketSummary from '../../Common/Summaries/OpenTicketSummary';
import TotalAssetSummary from '../../Common/Summaries/TotalAssetSummary';

const SectionOne = () => {
  const [isLoading] = useState(false);
  const ticketValue = 900;
  return (
    <SimpleGrid width="full" columns={4} columnGap="16px">
      {/* Open Ticket */}
      <OpenTicketSummary isLoading={false} />
      {/* Open Ticket */}
      <TotalAssetSummary isLoading={false} />
      {/* Upcoming Maintenance */}
      <SummaryCardWrapper
        title="Upcoming Maintenance"
        icon={MaintenanceIcon}
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
            <Skeleton isLoaded={!isLoading}>
              <Text
                color="#07CC3B"
                py="2.65px"
                px="5.3px"
                rounded="full"
                bgColor="#07CC3B0D"
                fontWeight={700}
              >
                05
              </Text>
            </Skeleton>
            <Text color="neutral.600" fontWeight={700}>
              Today
            </Text>
          </HStack>
        </VStack>
      </SummaryCardWrapper>
      {/* Upcoming Maintenance */}
      <TaskOverview />
    </SimpleGrid>
  );
};

export default SectionOne;
