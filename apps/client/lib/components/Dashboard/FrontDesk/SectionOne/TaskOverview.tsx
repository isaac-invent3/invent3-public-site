import React from 'react';
import SummaryCardWrapper from '../../../Common/SummaryCardWrapper';
import { TaskIcon } from '~/lib/components/CustomIcons/Dashboard';
import {
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';

interface TaskOverviewProps {
  isLoading: boolean;
  taskCount: number | undefined;
  completedTaskCount: number | undefined;
  notCompletedTaskCount: number | undefined;
  percentageCompleted: number | undefined;
}
const TaskOverview = (props: TaskOverviewProps) => {
  const {
    isLoading,
    taskCount,
    completedTaskCount,
    notCompletedTaskCount,
    percentageCompleted,
  } = props;
  return (
    <SummaryCardWrapper
      title="Task Overview"
      icon={TaskIcon}
      containerStyle={{ minH: '164px' }}
    >
      <HStack width="full" spacing="23px" justifyContent="space-between">
        <VStack
          justifyContent="space-between"
          alignItems="flex-start"
          height="full"
          spacing="28px"
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
                {taskCount?.toLocaleString() ?? '-'}
              </Text>
            </Skeleton>
            <Text color="neutral.600" fontWeight={700} mb="4px">
              This month
            </Text>
          </HStack>
          <Skeleton isLoaded={!isLoading}>
            <VStack alignItems="flex-start" spacing="11px">
              <Text color="neutral.600">
                {completedTaskCount?.toLocaleString() ?? '-'} Completed
              </Text>
              <Text color="neutral.600">
                {notCompletedTaskCount?.toLocaleString() ?? '-'} Not Completed
              </Text>
            </VStack>
          </Skeleton>
        </VStack>
        <CircularProgress
          value={percentageCompleted ?? 0}
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
            {percentageCompleted ? percentageCompleted?.toFixed(2) : 0}%
          </CircularProgressLabel>
        </CircularProgress>
      </HStack>
    </SummaryCardWrapper>
  );
};

export default TaskOverview;
