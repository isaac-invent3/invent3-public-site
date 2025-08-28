import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';

import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { TaskInstance } from '~/lib/interfaces/task.interfaces';
import { useGetAllTaskInstancesByScheduleInstanceIdQuery } from '~/lib/redux/services/task/instance.services';

interface OtherRelatedTasksProps {
  data: TaskInstance;
}
const OtherRelatedTasks = ({ data }: OtherRelatedTasksProps) => {
  const { data: otherTasks, isLoading } =
    useGetAllTaskInstancesByScheduleInstanceIdQuery({
      id: data?.scheduleInstanceId,
    });

  return (
    <VStack width="full" spacing="8px" alignItems="flex-start">
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
        ) : otherTasks?.data &&
          otherTasks?.data?.items.filter(
            (item) => item.taskInstanceId !== data?.taskInstanceId
          ).length >= 1 ? (
          otherTasks?.data?.items
            .filter((item) => item.taskInstanceId !== data?.taskInstanceId)
            .map((item, index: number) => (
              <HStack
                width="full"
                justifyContent="space-between"
                py="10px"
                key={index}
              >
                <Text color="black" width="full" maxW="60%">
                  {item.taskInstanceName}
                </Text>
                <GenericStatusBox
                  text={data?.currentStatus}
                  colorCode={data?.statusColorCode}
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
