import { HStack, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';
import {
  AssetBoxIcon,
  MaintenanceIcon,
  TicketIcon,
} from '~/lib/components/CustomIcons/Dashboard';
import TaskOverview from './TaskOverview';
import ProgressIndicator from '../../Common/ProgressIndicator';

const SectionOne = () => {
  const [isLoading] = useState(false);
  const ticketValue = 900;
  return (
    <SimpleGrid width="full" columns={4} columnGap="16px">
      {/* Open Ticket */}
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
      {/* Open Ticket */}
      {/* Asset In Use */}
      <SummaryCardWrapper
        title="Assets in Use"
        icon={AssetBoxIcon}
        containerStyle={{ minH: '164px' }}
      >
        <VStack
          justifyContent="space-between"
          alignItems="flex-start"
          height="full"
        >
          <VStack alignItems="flex-start" spacing="8px">
            <HStack spacing="4px">
              <Text
                mt="8px"
                fontSize="24px"
                lineHeight="28.51px"
                fontWeight={800}
                color="primary.500"
              >
                {ticketValue !== undefined ? ticketValue.toLocaleString() : '-'}
              </Text>
              <ProgressIndicator valueChange={-10} />
            </HStack>
            <Text color="neutral.600" fontWeight={700}>
              This month
            </Text>
          </VStack>
          <HStack spacing="4px">
            <Skeleton isLoaded={!isLoading}>
              <Text
                color="#0366EF"
                py="4px"
                px="12px"
                rounded="full"
                bgColor="#0366EF1A"
                fontWeight={700}
              >
                {90}
              </Text>
            </Skeleton>
            <Text color="neutral.600" fontWeight={700}>
              Assets{' '}
              <Text as="span" color="black" fontWeight={800}>
                NOT
              </Text>{' '}
              is Use
            </Text>
          </HStack>
        </VStack>
      </SummaryCardWrapper>
      {/* Asset In Use */}
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
