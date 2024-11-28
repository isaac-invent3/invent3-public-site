import { Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

const SectionOne = () => {
  const formDetails = useAppSelector((state) => state.maintenance);
  const {
    planName,
    assetName,
    assetGroupTypeName,
    startDate,
    endDate,
    planTypeName,
    schedules,
  } = formDetails.planForm;

  const totalEstimateCost = formDetails.planForm.schedules.reduce(
    (totalCost, schedule) => {
      const scheduleCost = schedule.tasks.reduce(
        (sum, task) => sum + (task.costEstimate ?? 0),
        0
      );
      return totalCost + scheduleCost;
    },
    0
  );

  const details = [
    {
      label: `Asset ${planTypeName === 'Default' ? 'Group' : 'Name'}`,
      value: planTypeName === 'Default' ? assetGroupTypeName : assetName,
    },
    {
      label: 'Start Date',
      value: dateFormatter(startDate, 'Do MMM, YYYY', 'DD/MM/YYYY') ?? 'N/A',
    },
    {
      label: 'End Date',
      value: dateFormatter(endDate, 'Do MMM, YYYY', 'DD/MM/YYYY') ?? 'N/A',
    },
    {
      label: 'No. Of Schedules',
      value: schedules.length?.toLocaleString(),
    },
    {
      label: 'Estimate Cost',
      value: amountFormatter(totalEstimateCost),
    },
  ];
  return (
    <Flex width="full" gap="16px">
      <VStack alignItems="flex-start" spacing="8px" width="393px">
        <Text fontWeight={700} color="neutral.600">
          Plan Title
        </Text>
        <Text size="md" color="black">
          {planName}
        </Text>
      </VStack>
      <Flex width="full" gap="16px" justifyContent="space-between">
        {details.map((detail, index) => (
          <VStack alignItems="flex-start" spacing="8px" key={index}>
            <Text fontWeight={700} color="neutral.600">
              {detail.label}
            </Text>
            <Text size="md" color="black">
              {detail.value}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Flex>
  );
};

export default SectionOne;
