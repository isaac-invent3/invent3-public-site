import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Task } from '~/lib/interfaces/task.interfaces';
import { useGetAllTasksByScheduleIdQuery } from '~/lib/redux/services/task/general.services';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';

interface OtherRelatedTasksProps {
  data: Task;
}
const OtherRelatedTasks = ({ data }: OtherRelatedTasksProps) => {
  const { data: otherTasks, isLoading } = useGetAllTasksByScheduleIdQuery({
    id: data?.scheduleId,
  });

  return (
    <VStack
      width="full"
      spacing="8px"
      alignItems="flex-start"
      pl="32px"
      pr="28px"
    >
      <Text color="neutral.600" fontWeight={700}>
        Other Related Tasks:
      </Text>
      <VStack width="full" py="8px" px="16px" bgColor="#F7F7F7">
        {isLoading ? (
          Array(5)
            .fill('')
            .map((_, idx) => (
              <HStack
                width="full"
                justifyContent="space-between"
                key={idx}
                py="10px"
              >
                <Skeleton width="50%" height="20px" />
                <Skeleton height="18px" rounded="4px" width="58px" />
              </HStack>
            ))
        ) : otherTasks?.data && otherTasks?.data?.items.length >= 1 ? (
          otherTasks?.data?.items
            .filter((item: Task) => item.taskId !== data?.taskId)
            .map((item: Task, index: number) => (
              <HStack
                width="full"
                justifyContent="space-between"
                py="10px"
                key={index}
              >
                <Text color="black" width="full" maxW="60%">
                  {item.taskName}
                </Text>
                <GenericStatusBox
                  text={data?.status}
                  colorCode={
                    MaintenanceColorCode[data?.status as 'Not Started']
                  }
                />
              </HStack>
            ))
        ) : (
          <Text color="neutral.700" py="50px" width="full" textAlign="center">
            No Related Tasks
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default OtherRelatedTasks;
