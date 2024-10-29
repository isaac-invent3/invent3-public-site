import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Task } from '~/lib/interfaces/task.interfaces';
import { amountFormatter } from '~/lib/utils/Formatters';

interface SectionTwoProps {
  data: Task;
}
const SectionTwo = ({ data }: SectionTwoProps) => {
  return (
    <VStack width="full" spacing="34px" pl="32px" pr="28px">
      <HStack width="full" spacing="57px" alignItems="flex-start">
        <VStack width="full" spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Schedule ID
          </Text>
          <Text color="neutral.600" size="md">
            <Text as="span" color="black">
              {data?.scheduleId}
            </Text>{' '}
            - {data?.taskName}
          </Text>
        </VStack>
        <VStack width="full" spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Estimate Cost
          </Text>
          <Text color="black" size="md">
            {amountFormatter(data?.costEstimate ?? 0)}
          </Text>
        </VStack>
        <VStack width="full" spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Assign to:
          </Text>
          <HStack spacing="14px">
            <Avatar width="42px" height="42px" />
            <Text size="md" color="black">
              {data?.assignedToEmployeeName}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <VStack width="full" spacing="8px" alignItems="flex-start">
        <Text color="neutral.600" fontWeight={700}>
          Description:
        </Text>
        <Text
          bgColor="#F0F0F0"
          color="neutral.700"
          size="md"
          rounded="8px"
          pt="8px"
          px="11px"
          pb="38px"
          width="full"
        >
          {data?.taskDescription}
        </Text>
      </VStack>
    </VStack>
  );
};

export default SectionTwo;
