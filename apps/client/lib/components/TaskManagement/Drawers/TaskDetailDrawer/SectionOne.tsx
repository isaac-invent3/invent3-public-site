import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Task } from '~/lib/interfaces/task.interfaces';
import {
  MaintenanceColorCode,
  TaskPriorityColorCode,
} from '~/lib/utils/ColorCodes';

interface SectionOneProps {
  data: Task;
}
const SectionOne = ({ data }: SectionOneProps) => {
  const info = [
    {
      label: 'Task ID:',
      value: data?.taskId,
    },
    {
      label: 'Estimated Time',
      value: `${data?.estimatedDurationInHours} ${data?.estimatedDurationInHours > 1 ? 's' : ''}`,
    },
  ];

  return (
    <VStack
      bgColor="#B4BFCA4D"
      pt="24px"
      px="42px"
      pb="49px"
      spacing="16px"
      width="full"
      alignItems="flex-start"
    >
      <Heading
        fontSize="32px"
        lineHeight="38.02px"
        color="black"
        fontWeight={800}
      >
        #{data?.taskId} {data?.taskName}
      </Heading>
      <HStack width="full" spacing="32px">
        <VStack alignItems="flex-start" spacing="8px">
          {info.map((item, index) => (
            <HStack spacing="16px" key={index}>
              <Text width="99px" size="md" color="neutral.600">
                {item.label}
              </Text>
              <Text color="black">{item.value}</Text>
            </HStack>
          ))}
        </VStack>
        <VStack alignItems="flex-start" spacing="8px">
          <HStack spacing="8px">
            <Text width="62px" size="md" color="neutral.600">
              Status:
            </Text>
            <GenericStatusBox
              text={data?.status}
              colorCode={MaintenanceColorCode[data?.status as 'Not Started']}
            />
          </HStack>
          <HStack spacing="8px">
            <Text width="62px" size="md" color="neutral.600">
              Priority:
            </Text>
            <GenericStatusBox
              text={data?.priorityName}
              colorCode={TaskPriorityColorCode[data?.priorityName as 'High']}
            />
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default SectionOne;
