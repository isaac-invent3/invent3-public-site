import React from 'react';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';
import { TaskIcon } from '~/lib/components/CustomIcons/Dashboard';
import {
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';

const TaskOverview = () => {
  const ticketValue = 437;
  return (
    <SummaryCardWrapper
      title="Upcoming Maintenance"
      icon={TaskIcon}
      containerStyle={{ minH: '164px' }}
    >
      <HStack>
        <VStack
          justifyContent="space-between"
          alignItems="flex-start"
          height="full"
          spacing="28px"
        >
          <HStack alignItems="flex-end" spacing="4px">
            <Skeleton isLoaded={true}>
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
          <VStack alignItems="flex-start" spacing="11px">
            <Text color="neutral.600">130 Task Completed</Text>
            <Text color="neutral.600">330 Task NotCompleted</Text>
          </VStack>
        </VStack>
        <CircularProgress
          value={40}
          color="primary.500"
          thickness="16px"
          size="100px"
        >
          <CircularProgressLabel
            color="primary.500"
            fontSize="13px"
            lineHeight="15.44px"
            fontWeight={700}
          >
            40%
          </CircularProgressLabel>
        </CircularProgress>
      </HStack>
    </SummaryCardWrapper>
  );
};

export default TaskOverview;
